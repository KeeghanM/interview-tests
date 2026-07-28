# Mid-Level Full-Stack Developer Test

This is a small expenses application with a React frontend and Python business logic exposed through a local Node bridge. Python runs in Pyodide, so only Node.js and npm are needed.

## Run it

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The API is available at `http://localhost:3000/api/expenses`.

## Ticket

### BUG: "All" expenses returns an empty table

The Expenses page initially shows no records. Choosing `Pending` works, but selecting `All` returns an empty table again.

Expected behaviour:

- `All` returns every expense.
- `Pending` and `Approved` return only matching expenses.
- The API and UI remain consistent.
- The fix is covered by an automated test.

Please investigate the problem across the React and Python boundary, implement the smallest maintainable fix, and be ready to explain your diagnosis. You may use AI tools, but you must understand and validate every change.
