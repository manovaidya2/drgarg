import express from "express";
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { rateLimit } from "../middleware/rateLimiter.js";
import CmsSession from "../models/CmsSession.js";
import { getLocalDemoAccount } from '../utils/cmsDemoAccount.js';
import {
  getCmsAccounts,
  requireScope,
  tokenHash,
} from "../middleware/cmsAuth.js";
const router = express.Router();
const loginLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  standardHeaders: true,
  legacyHeaders: false,
});
const sendSession = async (account, res) => {
  const token = randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);
  await CmsSession.create({
    tokenHash: tokenHash(token), userId: account.id,
    credentialVersion: String(account.version || '1'), scopes: account.scopes, expiresAt,
  });
  res.json({ token, expiresAt, user: { id: account.id, username: account.username, scopes: account.scopes } });
};
const localSampleAccount = (req) => {
  const [demo] = getLocalDemoAccount(req);
  return demo && getCmsAccounts(req).find((account) => account === demo);
};
router.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
router.get('/options', (req, res) => res.json({ demoLoginEnabled: Boolean(localSampleAccount(req)) }));
router.post('/demo-login', loginLimit, async (req, res, next) => {
  try {
    const account = localSampleAccount(req);
    if (!account) return res.status(404).json({ message: 'Sample login is not available.' });
    await sendSession(account, res);
  } catch (error) { next(error); }
});
router.post(
  "/login",
  loginLimit,
  async (req, res, next) => {
    try {
      const accounts = getCmsAccounts(req);
      if (!accounts.length)
        return res
          .status(503)
          .json({
            message: "CMS accounts have not been configured on the server.",
          });
      const account = accounts.find(
        (item) => item.username === String(req.body.username || '').trim(),
      );
      const valid = await bcrypt.compare(
        String(req.body.password || ""),
        account?.passwordHash ||
          "$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalid",
      );
      if (!account || !valid)
        return res
          .status(401)
          .json({ message: "Invalid username or password." });
      await sendSession(account, res);
    } catch (error) {
      next(error);
    }
  },
);
router.get("/session", requireScope(), (req, res) =>
  res.json({
    user: { id: req.cmsSession.userId, scopes: req.cmsScopes },
    expiresAt: req.cmsSession.expiresAt,
  }),
);
router.post("/logout", requireScope(), async (req, res, next) => {
  try {
    await CmsSession.updateOne(
      { _id: req.cmsSession._id },
      { $set: { revokedAt: new Date() } },
    );
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});
export default router;
