import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { rateLimit, ipKeyGenerator } from '../middleware/rateLimiter.js';

const invoke = (limiter, ip = '192.0.2.1') => {
  const result = { headers: {}, status: 200, passed: false };
  const res = {
    setHeader: (name, value) => { result.headers[name] = value; },
    status: (code) => { result.status = code; return res; },
    send: (body) => { result.body = body; return res; },
  };
  limiter({ ip }, res, () => { result.passed = true; });
  return result;
};

test('default allows 100 requests, then returns the existing 429 body and retry headers', () => {
  const limiter = rateLimit();
  for (let i = 0; i < 100; i++) assert.equal(invoke(limiter).passed, true);
  const blocked = invoke(limiter);
  assert.equal(blocked.status, 429);
  assert.equal(blocked.passed, false);
  assert.equal(blocked.body, 'Too many requests, please try again later.');
  assert.equal(blocked.headers['RateLimit-Remaining'], '0');
  assert.ok(Number(blocked.headers['Retry-After']) > 0);
  assert.equal(blocked.headers['RateLimit-Limit'], '100');
});

test('custom limits isolate clients and limiter instances', () => {
  const first = rateLimit({ limit: 1, windowMs: 60000 });
  const second = rateLimit({ limit: 1, windowMs: 60000 });
  assert.equal(invoke(first).passed, true);
  assert.equal(invoke(first).status, 429);
  assert.equal(invoke(first, '192.0.2.2').passed, true);
  assert.equal(invoke(second).passed, true);
});

test('IPv6 subnet rotation and IPv4-mapped aliases cannot bypass the limit', () => {
  assert.equal(ipKeyGenerator('::ffff:192.0.2.1'), '192.0.2.1');
  assert.equal(ipKeyGenerator('::ffff:c000:201'), '192.0.2.1');
  assert.equal(ipKeyGenerator('2001:db8:abcd:1200::1'), ipKeyGenerator('2001:db8:abcd:12ff::2'));
  const limiter = rateLimit({ limit: 1 });
  assert.equal(invoke(limiter, '2001:db8:abcd:1200::1').passed, true);
  assert.equal(invoke(limiter, '2001:db8:abcd:12ff::2').status, 429);
  assert.equal(invoke(limiter, '2001:db8:abcd:1300::1').passed, true);
});

test('expired windows reset on access without waiting for cleanup', (t) => {
  const limiter = rateLimit({ limit: 1, windowMs: 1000 });
  t.mock.method(Date, 'now', () => 10000);
  assert.equal(invoke(limiter).passed, true);
  assert.equal(invoke(limiter).status, 429);
  Date.now.mock.mockImplementation(() => 11000);
  assert.equal(invoke(limiter).passed, true);
});

test('capacity rejects new identities without resetting existing counters; cleanup frees idle entries', async () => {
  const limiter = rateLimit({ limit: 1, windowMs: 20, maxEntries: 1 });
  assert.equal(invoke(limiter).passed, true);
  assert.equal(invoke(limiter, '192.0.2.2').status, 429);
  assert.equal(invoke(limiter).status, 429);
  await new Promise((resolve) => setTimeout(resolve, 80));
  assert.equal(invoke(limiter, '192.0.2.2').passed, true);
});

test('invalid configuration fails at construction', () => {
  for (const options of [{ limit: 0 }, { limit: 1.5 }, { windowMs: -1 }, { windowMs: Infinity }, { maxEntries: 0 }]) {
    assert.throws(() => rateLimit(options), TypeError);
  }
});

test('HTTP clients cannot rotate arbitrary forwarding headers under the existing default proxy policy', async () => {
  const app = express();
  app.get('/', rateLimit({ limit: 2 }), (req, res) => res.sendStatus(204));
  const server = app.listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  try {
    const url = `http://127.0.0.1:${server.address().port}/`;
    for (const [index, status] of [204, 204, 429].entries()) {
      const response = await fetch(url, { headers: { 'X-Forwarded-For': `192.0.2.${index + 1}` } });
      assert.equal(response.status, status);
      await response.text();
    }
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
});
