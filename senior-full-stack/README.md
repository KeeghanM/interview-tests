# Senior Full-Stack Developer Test

Relay is an operations console built with React, TypeScript, FastAPI, SQLAlchemy and SQLite. The client uses Zustand for selected-service state and React Query for server state. The Python API is split into route, service and repository layers.

The local SQLite database is created and seeded automatically on first launch. Python and project dependencies are managed by `uv`; no manual virtual environment, database server, external service or API key is required. Response timing is deterministic so the reported production behaviour can be reproduced locally.

## Run it

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The API is available at `http://localhost:3000`.

Use Node.js 22 and install [`uv`](https://docs.astral.sh/uv/getting-started/installation/) before starting. `uv run` installs the pinned Python version and dependencies automatically.

## Ticket

### BUG: Service dashboard leaks and displays stale incident data

During incidents, operators switch services quickly. The selected service heading, summary, and incident list can disagree, and incidents can appear under the wrong service.

Steps to reproduce:

1. Open the application and wait for the Checkout Web dashboard to load.
2. Observe that the checkout incident list includes an incident belonging to Search Indexer.
3. Reload the page and select Search Indexer as soon as the service list appears, before Checkout Web finishes loading.
4. Observe that the selected heading can say Search Indexer while the summary and incident list later show Checkout Web data.

Expected behaviour:

- A service dashboard contains only incidents belonging to that service.
- The heading, summary and incident list always refer to the same selected service.
- The dashboard remains consistent when services are switched quickly.
- Loading and error states never present stale data as current.

Investigate the full request path, fix the underlying issues, and document any material trade-offs. Avoid removing the deterministic delay: it exists to reproduce production timing reliably. You may use AI tools, but you must understand and validate every change.
