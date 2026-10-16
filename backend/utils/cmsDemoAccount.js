import bcrypt from 'bcryptjs';

const demoAccount = {
  id: 'local-demo-admin',
  username: 'manovaidya',
  passwordHash: bcrypt.hashSync('manovaidya@123', 10),
  version: 'local-demo-2',
  scopes: ['clinic:admin', 'blog:read', 'blog:write', 'media:read', 'media:write'],
};

export const getLocalDemoAccount = (req) => {
  if (process.env.CMS_DEMO_LOGIN !== 'true' || process.env.NODE_ENV === 'production' || !req) return [];
  const address = req.socket?.remoteAddress;
  if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(address)) return [];
  try {
    const host = new URL(`http://${req.get('host')}`).hostname;
    if (!['localhost', '127.0.0.1', '[::1]'].includes(host)) return [];
    if (req.headers.origin) {
      const origin = new URL(req.headers.origin);
      if (!['http:', 'https:'].includes(origin.protocol) || !['localhost', '127.0.0.1', '[::1]'].includes(origin.hostname)) return [];
    }
    return [demoAccount];
  } catch { return []; }
};
