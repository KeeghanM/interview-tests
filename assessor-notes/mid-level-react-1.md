# Mid-Level React 1 interviewer guide

Suggested timebox: 30 minutes, including implementation and follow-up discussion.

Score out of 20: diagnosis and debugging process (8), correctness and filter consistency (3), preventative type design (4), validation (2), communication (3).

This is primarily a debugging assessment. The final change is deliberately small; the signal comes from how the candidate navigates an unfamiliar application, gathers evidence, narrows the fault and controls scope.

## Ideal steps

1. Reproduce the empty initial table, then switch to `Pending` and back to `All` to confirm the reported behaviour.
2. Inspect the browser network tab and confirm that `/api/expenses` returns all expenses. This rules out the API and narrows the problem to client-side processing.
3. Trace the returned data into `ExpensesTable`. Targeted logging of the fetched expenses, current filter state or filtered result is a reasonable diagnostic technique.
4. Inspect the filter predicate and compare its expected values with the initial Zustand state and the `<select>` option values.
5. Identify that the store starts with lowercase `all`, while the UI and predicate use `All`. Correct the inconsistent model rather than adding an effect or render-time exception.
6. Verify the initial table and each status filter after the change.

Other evidence-led paths are valid. A candidate may use React Query Devtools, browser breakpoints, tests or direct API requests instead of the network tab and console.

## Signals to observe

- Reproduces the issue before editing and can state what changed between the failing and working states.
- Separates data retrieval from client-side transformation instead of guessing which layer is broken.
- Uses logs or breakpoints to test a hypothesis rather than scattering output across the codebase.
- Reads the state, select and predicate as one data flow.
- Notices the date filter has a related casing inconsistency. This is a positive signal; fixing it is not required for the reported ticket.
- Can distinguish noticing adjacent problems from expanding the scope of the change.
- Does not rewrite React Query, Zustand or the component structure to fix a value mismatch.
- Explains and validates every change, including AI-assisted changes.

## Follow-up questions

### How would you prevent this in the future?

Look for a status-filter union such as `'All' | 'Pending' | 'Approved' | 'Rejected'` in the state file, applied to both `statusFilter` and `setStatusFilter`, then propagated through the select and filtering code. A strong candidate may type the date and sort values or derive options from a shared typed definition.

### Why does `event.target.value` still need an assertion or validation?

Look for an understanding that the DOM exposes a `string`, even when the rendered options are constrained. An assertion informs TypeScript but does not validate runtime input. Derived options, a type guard or a typed wrapper are valid alternatives when stronger runtime guarantees are justified.

### What role is React Query playing here?

Look for the distinction between server state and local UI state, query keys, caching and invalidation. The status filter is currently local derived state; moving it into the query would only make sense if filtering became server-side.

### When would you choose Zustand, Redux, Context or local component state?

Look for trade-offs based on ownership, update frequency, tooling, middleware, conventions and application size. Productive answers avoid treating one library as universally superior.

### Why might a console log appear more than once in development?

Look first for ordinary rerenders as query data and component state change. The starter does not explicitly enable Strict Mode, but a strong candidate may also explain its deliberate development-only render and effect setup/cleanup checks and how those would change observations if enabled. The exact answer depends on where the log is placed; do not accept "React always runs everything twice" as a complete explanation.

### Would you fix the date-filter inconsistency in the same change?

Either answer can be strong. Look for explicit risk, testability and scope reasoning rather than a preference for maximum cleanup or minimum diff at all costs.

## Scoring anchors

- **Weak:** guesses across multiple layers, edits without reproducing, or cannot explain why changing filters alters the result.
- **Baseline:** eventually identifies and corrects the inconsistent value and manually verifies the ticket.
- **Good:** uses runtime evidence to eliminate the API, traces state deliberately, keeps the fix focused and validates all status options.
- **Strong:** implements the preventative type cleanly, explains the DOM typing boundary and discusses state-management trade-offs with relevant experience.
- **Exceptional:** combines systematic diagnosis with excellent scope judgment, notices adjacent issues without derailing, and communicates concise hypotheses and evidence throughout.
