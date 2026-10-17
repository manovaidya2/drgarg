import test from 'node:test';
import assert from 'node:assert/strict';
import bcrypt from 'bcryptjs';
import { ipKeyGenerator } from '../middleware/rateLimiter.js';
import { getCmsAccounts } from '../middleware/cmsAuth.js';

const request = (address = '::1', host = 'localhost:5003', origin = 'http://localhost:5173') => ({
  socket: { remoteAddress: address }, get: () => host, headers: { origin },
});

test('IPv6 localhost and mapped IPv4 rate-limit keys work with the local middleware', () => {
  for (const address of ['::1', '::ffff:127.0.0.1', '127.0.0.1', '2001:db8::1']) {
    assert.equal(typeof ipKeyGenerator(address), 'string');
  }
});

test('sample admin is explicitly enabled, local-only and never replaces configured accounts', async () => {
  const previous = Object.fromEntries(['CMS_DEMO_LOGIN', 'CMS_ACCOUNTS_JSON', 'NODE_ENV'].map((key) => [key, process.env[key]]));
  try {
    process.env.CMS_DEMO_LOGIN = 'true';
    process.env.CMS_ACCOUNTS_JSON = '[]';
    process.env.NODE_ENV = 'development';
    const [account] = getCmsAccounts(request());
    assert.equal(account.username, 'manovaidya');
    assert.equal(await bcrypt.compare('manovaidya@123', account.passwordHash), true);
    assert.ok(account.scopes.includes('clinic:admin'));
    assert.deepEqual(getCmsAccounts(request('203.0.113.1')), []);
    assert.deepEqual(getCmsAccounts(request('::1', 'api.drankushgarg.com')), []);
    assert.deepEqual(getCmsAccounts(request('::1', 'localhost:5003', 'https://external.example')), []);
    process.env.NODE_ENV = 'production';
    assert.deepEqual(getCmsAccounts(request()), []);
    process.env.NODE_ENV = 'development';
    process.env.CMS_DEMO_LOGIN = 'false';
    assert.deepEqual(getCmsAccounts(request()), []);
    process.env.CMS_DEMO_LOGIN = 'true';
    process.env.CMS_ACCOUNTS_JSON = JSON.stringify([{ id: 'configured', username: 'real-editor', passwordHash: 'configured-hash', scopes: ['blog:read'] }]);
    assert.deepEqual(getCmsAccounts(request()).map((item) => item.username), ['real-editor']);
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
});
