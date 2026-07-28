# Interviewer assessment

Suggested timebox: 30 minutes.

Score out of 20: diagnosis and debugging process (5), correctness and edge cases (5), test quality (4), maintainability (3), communication and validation of AI-assisted work (3).

Strong candidates reproduce the issue before editing, trace the request through both services, avoid special-casing in the UI, add focused regression coverage, and explain why the chosen layer owns the behaviour.

## Ideal steps

1. Reproduce the empty initial table and verify that `Pending` and `Approved` return matching rows.
2. Inspect the network request and response, then call `/api/expenses?status=All` directly to confirm that the API returns the empty result.
3. Trace the value through the React request, Express route, Pyodide bridge, and `filter_expenses` Python function.
4. Identify that `All` is truthy, so Python incorrectly treats it as a real expense status and filters out every record.
5. Fix the filter semantics in the backend rather than compensating for the bad response in the UI. Preserve omitted, `Pending`, and `Approved` behaviour.
6. Run the existing tests, add or strengthen regression coverage for `All`, and manually verify that the API and table agree.

## Follow-up

Ask: "How would you prevent UI filter labels and API filter semantics from drifting across this boundary?"

Expected answer: define the API contract independently of display labels, use a canonical enum or omit the query parameter when no filter is intended, and add boundary-level tests for every supported value. Strong answers distinguish unit coverage of the Python function from an integration test of the HTTP endpoint.
