const path = require('node:path');

// Keep this file in the project root, outside backend's "type": "module" scope.
module.exports = {
  apps: [
    {
      name: 'drgarg-api',
      cwd: path.join(__dirname, 'backend'),
      script: './server.js',
      exec_mode: 'cluster',
      instances: 1, // Change to 'max' to use all available CPU cores.
      autorestart: true,
      watch: false,
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 3000,
      listen_timeout: 10000,
      kill_timeout: 5000,
      merge_logs: true,
      time: true,
      env: {
        NODE_ENV: 'production',
        PORT: 5025,
      },
      // Existing backend/.env is loaded by server.js; keep secrets out of this file.
      // The local rate limiter has separate counters in each cluster worker.
    },
  ],
};
