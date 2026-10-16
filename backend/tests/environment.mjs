import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import Blog from "../models/Blog.js";
import BlogRevision from "../models/BlogRevision.js";
import CmsSession from "../models/CmsSession.js";
import BlogMedia from "../models/BlogMedia.js";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
export const testPassword = "isolated-fixture-password";
export const createEnvironment = async () => {
  const mediaDir = await fs.mkdtemp(
    path.join(os.tmpdir(), "drgarg-cms-test-media-"),
  );
  process.env.CMS_UPLOAD_DIR = mediaDir;
  const database = await MongoMemoryReplSet.create({
    replSet: { count: 1, storageEngine: "wiredTiger" },
  });
  process.env.MONGODB_URI = database.getUri();
  process.env.CMS_PREVIEW_SECRET =
    "isolated-preview-secret-used-only-for-tests";
  process.env.CMS_ACCOUNTS_JSON = JSON.stringify([
    {
      id: "fixture-editor",
      username: "fixture-editor",
      passwordHash: await bcrypt.hash(testPassword, 10),
      scopes: ["blog:read", "blog:write", "media:read", "media:write"],
      version: "1",
    },
  ]);
  await mongoose.connect(database.getUri());
  await Promise.all([
    Blog.createCollection(),
    BlogRevision.init(),
    CmsSession.init(),
    BlogMedia.init(),
  ]);
  await Blog.createIndexes();
  const { app } = await import("../server.js");
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  process.env.PUBLIC_API_URL = origin;
  let token;
  const request = async (
    route,
    { method = "GET", data, auth = true, body, headers = {} } = {},
  ) => {
    const response = await fetch(`${origin}${route}`, {
      method,
      headers: {
        ...(data ? { "Content-Type": "application/json" } : {}),
        ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: data ? JSON.stringify(data) : body,
    });
    const text = await response.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }
    return { status: response.status, headers: response.headers, json, text };
  };
  const login = async () => {
    const response = await request("/api/cms-auth/login", {
      method: "POST",
      auth: false,
      data: { username: "fixture-editor", password: testPassword },
    });
    token = response.json.token;
    return response;
  };
  return {
    origin,
    request,
    login,
    get token() {
      return token;
    },
    cleanup: async () => {
      server.closeAllConnections();
      await new Promise((resolve) => server.close(resolve));
      await mongoose.disconnect();
      await database.stop();
      await fs.rm(mediaDir, { recursive: true });
    },
  };
};
