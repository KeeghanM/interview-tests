# Senior Full-Stack Developer Test

This incident dashboard uses React and Python business logic behind a local API bridge. Python runs in Pyodide, so only Node.js and npm are required. All data and response timing are deterministic.

## Run it

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The API is available at `http://localhost:3000`.

## Ticket

### BUG: Service dashboard leaks and displays stale incident data

During incidents, operators switch services quickly. The dashboard can show incidents from another service owned by the same team, and a slower response can overwrite the most recent selection.

Expected behaviour:

- A service dashboard contains only incidents belonging to that service.
- The heading, summary and incident list always refer to the same selected service.
- Older requests cannot overwrite a newer selection.
- Loading and error states never present stale data as current.
- Regression tests cover the data-isolation failure.

Investigate the full request path, fix the underlying issues, and document any material trade-offs. Avoid removing the deterministic delay: it exists to reproduce production timing reliably. You may use AI tools, but you must understand and validate every change.
