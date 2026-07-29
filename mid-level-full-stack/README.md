# Mid-Level Full-Stack Developer Test

Ledger is a finance operations application built with React, TypeScript, FastAPI, SQLAlchemy and SQLite. The client uses Zustand for workspace state and React Query for server state. The Python API is split into route, service and repository layers.

The local SQLite database is created and seeded automatically on first launch. Python and project dependencies are managed by `uv`; no manual virtual environment, database server, external service or API key is required.

## Run it

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The API is available at `http://localhost:3000/api/expenses`.

Use Node.js 22 and install [`uv`](https://docs.astral.sh/uv/getting-started/installation/) before starting. `uv run` installs the pinned Python version and dependencies automatically.

## Ticket

### BUG: "All" expenses returns an empty table

The Expenses page shows no records when its status filter is set to `All`. Choosing `Pending` works, but selecting `All` returns an empty table again. The Overview page is not affected.

Steps to reproduce:

1. Open the application and select `Expenses` in the workspace navigation.
2. Observe that the claims ledger is empty with `All statuses` selected.
3. Select `Pending` and observe that matching claims appear.
4. Select `All statuses` again and observe that the ledger is empty.

Expected behaviour:

- `All` returns every expense.
- `Pending` and `Approved` return only matching expenses.
- Existing dashboard data remains correct.
- The API and UI remain consistent.

Please investigate the problem, implement the smallest maintainable fix, and be ready to explain your diagnosis. You may use AI tools, but you must understand and validate every change.
