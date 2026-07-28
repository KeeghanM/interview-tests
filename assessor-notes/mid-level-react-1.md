# Interviewer assessment

Suggested timebox: 30 minutes.

Score out of 20: diagnosis and debugging process (8), correctness and filter consistency (3), preventative type design (4), validation (2), communication (3).

Strong candidates reproduce the initial-state failure, identify the inconsistent status values rather than adding a render-time workaround, keep the store and UI values aligned, and test both the initial `All` state and filter transitions.

## Ideal steps

1. Reproduce the empty initial table, then switch to `Pending` and back to `All` to confirm the reported behaviour.
2. Inspect the browser network tab and confirm that `/api/expenses` returns all expenses. This rules out the API and narrows the problem to client-side processing.
3. Trace the returned data into `ExpensesTable`. Console logging the fetched expenses, current filter state, or filtered result is a reasonable way to see what changes after selecting a filter.
4. Inspect the filter predicate and compare its expected values with the initial Zustand state and the `<select>` option values.
5. Identify that the store starts with lowercase `all`, while the UI and predicate use `All`. Correct the state value rather than adding a special case or effect.
6. Verify that the initial table and each status filter work after the change.

## Follow-up

Ask: "How would you prevent this in the future?"

Expected answer: define a status-filter union type such as `'All' | 'Pending' | 'Approved' | 'Rejected'` in the state file, apply it to `statusFilter` and `setStatusFilter`, and carry that type through the select handler and filtering code. A strong answer may also type the date and sort values and add a regression test for the initial state.
