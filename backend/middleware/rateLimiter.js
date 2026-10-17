import { isIP } from 'node:net';
import { Address6 } from 'ip-address';

// Group IPv6 clients by /56, as the previous limiter did, to resist address rotation.
export const ipKeyGenerator = (ip) => {
  if (isIP(ip) !== 6) return ip;
  const address = new Address6(ip);
  if (address.isMapped4() || (address.is4() && address.isInSubnet(new Address6('::/96')))) {
    return address.to4().correctForm();
  }
  return new Address6(`${ip}/56`).networkForm();
};

// Fixed windows are local to this middleware instance/process and reset on restart.
// Multiple PM2 workers do not share counters; this is not a distributed limiter.
export const rateLimit = ({
  windowMs = 15 * 60 * 1000,
  limit = 100,
  standardHeaders = true,
  maxEntries = 50000,
} = {}) => {
  if (!Number.isSafeInteger(windowMs) || windowMs < 1 || windowMs > 2147483647 ||
      !Number.isSafeInteger(limit) || limit < 1 ||
      !Number.isSafeInteger(maxEntries) || maxEntries < 1) {
    throw new TypeError('Rate limiter requires positive integer windowMs, limit and maxEntries.');
  }
  const clients = new Map();
  const cleanup = setInterval(() => {
    const now = Date.now();
    for (const [key, client] of clients) {
      if (client.resetAt <= now) clients.delete(key);
    }
  }, Math.min(windowMs, 60000));
  cleanup.unref();

  return (req, res, next) => {
    const now = Date.now();
    // Express derives req.ip using its existing trust-proxy setting. Never read
    // forwarding headers directly. Unknown peers share a bucket rather than bypassing limits.
    const key = ipKeyGenerator(req.ip || req.socket?.remoteAddress || 'unknown');
    let client = clients.get(key);
    if (client && client.resetAt <= now) {
      clients.delete(key);
      client = undefined;
    }
    if (!client) {
      // Fail closed at capacity instead of evicting active clients and resetting their limits.
      if (clients.size >= maxEntries) {
        res.setHeader('Retry-After', String(Math.ceil(windowMs / 1000)));
        return res.status(429).send('Too many requests, please try again later.');
      }
      client = { hits: 0, resetAt: now + windowMs };
      clients.set(key, client);
    }
    client.hits = Math.min(client.hits + 1, limit + 1);
    const reset = Math.max(1, Math.ceil((client.resetAt - now) / 1000));
    if (standardHeaders) {
      res.setHeader('RateLimit-Policy', `${limit};w=${Math.ceil(windowMs / 1000)}`);
      res.setHeader('RateLimit-Limit', String(limit));
      res.setHeader('RateLimit-Remaining', String(Math.max(0, limit - client.hits)));
      res.setHeader('RateLimit-Reset', String(reset));
    }
    if (client.hits > limit) {
      res.setHeader('Retry-After', String(reset));
      return res.status(429).send('Too many requests, please try again later.');
    }
    return next();
  };
};
