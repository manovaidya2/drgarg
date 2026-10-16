import { createHash } from "node:crypto";
import CmsSession from "../models/CmsSession.js";
import { getLocalDemoAccount } from '../utils/cmsDemoAccount.js';
export const tokenHash = (token) =>
  createHash("sha256").update(token).digest("hex");
export const getCmsAccounts = (req) => {
  try {
    const accounts = JSON.parse(process.env.CMS_ACCOUNTS_JSON || "[]").filter(
      (account) =>
        account.active !== false &&
        account.id &&
        account.username &&
        account.passwordHash &&
        Array.isArray(account.scopes),
    );
    // Explicitly configured accounts take precedence over local demo credentials.
    return accounts.length ? accounts : getLocalDemoAccount(req);
  } catch {
    return [];
  }
};
export const requireScope = (scope) => async (req, res, next) => {
  try {
    if (!req.cmsSession) {
      const match = req.headers.authorization?.match(
        /^Bearer ([a-zA-Z0-9_-]{40,})$/,
      );
      if (!match)
        return res
          .status(401)
          .json({ message: "CMS authentication required." });
      const session = await CmsSession.findOne({
        tokenHash: tokenHash(match[1]),
        revokedAt: null,
        expiresAt: { $gt: new Date() },
      }).lean();
      const account =
        session &&
        getCmsAccounts(req).find(
          (item) =>
            item.id === session.userId &&
            String(item.version || "1") === session.credentialVersion,
        );
      if (!account)
        return res.status(401).json({ message: "Session expired or revoked." });
      req.cmsSession = session;
      req.cmsScopes = session.scopes.filter((item) =>
        account.scopes.includes(item),
      );
    }
    if (scope && !req.cmsScopes.includes(scope))
      return res
        .status(403)
        .json({ message: "This credential does not permit this operation." });
    next();
  } catch (error) {
    next(error);
  }
};
