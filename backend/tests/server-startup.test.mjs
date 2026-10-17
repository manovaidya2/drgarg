import test from 'node:test';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const runNode = promisify(execFile);

for (const mode of ['direct', 'pm2', 'import']) {
  test(`server startup via ${mode}`, async () => {
    // Isolate each import and stub external effects: no database or socket is opened.
    await runNode(process.execPath, ['--input-type=module', '-e', `
      import assert from 'node:assert/strict';
      import express from 'express';
      import mongoose from 'mongoose';
      import { fileURLToPath } from 'node:url';

      const entry = fileURLToPath(new URL('./server.js', import.meta.url));
      const mode = ${JSON.stringify(mode)};
      process.argv[1] = mode === 'direct' ? entry : 'ProcessContainer.js';
      delete process.env.pm_exec_path;
      if (mode === 'pm2') process.env.pm_exec_path = entry;
      process.env.PORT = '5025';

      let connections = 0;
      let listeners = 0;
      mongoose.connect = () => {
        connections++;
        return Promise.resolve();
      };
      express.application.listen = function (port) {
        assert.equal(String(port), '5025');
        listeners++;
      };

      const { app } = await import('./server.js');
      assert.equal(typeof app, 'function');
      assert.equal(connections, mode === 'import' ? 0 : 1);
      assert.equal(listeners, mode === 'import' ? 0 : 1);
    `], { cwd: new URL('../', import.meta.url), timeout: 15000 });
  });
}
