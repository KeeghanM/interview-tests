# Senior Full-Stack Developer Test

This incident dashboard uses React and Python business logic behind a local API bridge. Python runs in Pyodide, so only Node.js 22 and npm are required. All data and response timing are deterministic.

## Run it

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The API is available at `http://localhost:3000`.

Run the existing tests with `npm test`.

## Ticket

### BUG: Service dashboard leaks and displays stale incident data

During incidents, operators switch services quickly. The selected service heading, summary, and incident list can disagree, and incidents can appear under the wrong service.

Expected behaviour:

- A service dashboard contains only incidents belonging to that service.
- The heading, summary and incident list always refer to the same selected service.
- The dashboard remains consistent when services are switched quickly.
- Loading and error states never present stale data as current.
- Regression tests cover the data-isolation and rapid-switching failures.

Investigate the full request path, fix the underlying issues, and document any material trade-offs. Avoid removing the deterministic delay: it exists to reproduce production timing reliably. You may use AI tools, but you must understand and validate every change.
