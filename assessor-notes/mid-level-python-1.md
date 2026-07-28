# Interviewer assessment

Suggested timebox: 30 minutes.

Score out of 20: diagnosis and debugging process (4), API and query correctness (5), edge-case handling (4), test quality (4), maintainability and communication (3).

Strong candidates trace the query parameter into the repository, treat `All` as the absence of a status constraint, preserve specific-status and omitted-filter behaviour, and add tests that assert returned records rather than only response success.

## Ideal steps

1. Reproduce the issue through Swagger, a browser, or an HTTP client by comparing `/expenses`, `/expenses?status=All`, and `/expenses?status=Pending`.
2. Confirm that the endpoint itself is healthy and that only the `All` query value produces an empty result.
3. Trace `status` from the FastAPI route into `repository.list_expenses`. SQL logging or a debugger can be used to confirm the generated condition.
4. Identify that the truthy string `All` produces `WHERE expense.status = 'All'`, although `All` is a UI sentinel rather than a stored status.
5. Normalize `All` to no status constraint at a clear boundary, while preserving omitted and specific-status behaviour.
6. Extend the tests to check all records for `All`, correct records for a specific status, and unchanged behaviour when the parameter is omitted.

## Follow-up

Ask: "How would you prevent unsupported or ambiguous status values from reaching the query layer?"

Expected answer: model accepted query values with an enum or literal type, normalize the `All` sentinel at the API boundary, and keep the repository concerned with real database statuses or `None`. Contract tests should cover every accepted value and the response to invalid values.
