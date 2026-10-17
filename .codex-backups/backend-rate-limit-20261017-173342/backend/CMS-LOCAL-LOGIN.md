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

`express-rate-limit@8.7.1` requires `ip-address >=10.2.0`. The backend pins
`ip-address@10.2.0` to prevent the old tracked dependency from breaking IPv6
localhost requests with `address.isMapped4 is not a function`. Install backend
dependencies with `npm install` and restart the backend after dependency changes.
