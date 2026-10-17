# Local Sample Login

Run the backend at `http://localhost:5003` and use:

- Username: `manovaidya`
- Password: `manovaidya@123`

The sample account requires `CMS_DEMO_LOGIN=true` in the backend's local `.env`,
an empty/unset `CMS_ACCOUNTS_JSON`, and a localhost request. It issues the normal
database-backed session with blog, media and clinic admin scopes. MongoDB must be
connected. No frontend authentication bypass is used.

The localhost login screen also offers **Sample Admin Login** when the backend
reports that demo mode is available. This uses the same server-issued session and
does not depend on saved browser credentials. The demo endpoint is unavailable
in production or whenever real CMS accounts are configured.

Configured accounts always take precedence. The sample login is disabled when
`NODE_ENV=production`, for remote clients, or when the demo flag is off. For a
production release set `NODE_ENV=production`, remove/disable `CMS_DEMO_LOGIN`, and
configure real accounts through `CMS_ACCOUNTS_JSON`.

Rate limits use `middleware/rateLimiter.js` and the existing pinned
`ip-address@10.2.0` dependency for IPv6 /56 grouping and mapped IPv4 addresses.
The default is 100 requests per IP per 15 minutes; blog writes retain 60 per minute
and login retains 15 per 15 minutes. Counters are per middleware instance and per
process, reset on restart, and are not shared across PM2 workers. Expired entries
are cleaned periodically, with a 50,000-entry cap per instance that rejects new
clients with HTTP 429 when full. Client addresses come from Express's existing
trust-proxy policy; forwarding headers are never read directly. No proxy settings
have been changed, so a reverse proxy may share one bucket across its clients.
