# Mid-Level Python 1 interviewer guide

Suggested timebox: 45 minutes, including tests and follow-up discussion.

Score out of 20: diagnosis and debugging process (5), API and query correctness (4), edge-case handling (3), test quality (4), maintainability and communication (4).

This is primarily an API debugging assessment. The correction is small; the signal comes from comparing requests, following a value through FastAPI and SQLAlchemy, and defining where transport semantics become domain semantics.

## Ideal steps

1. Reproduce the issue through Swagger, a browser or an HTTP client by comparing `/expenses`, `/expenses?status=All` and `/expenses?status=Pending`.
2. Confirm that the endpoint is healthy and that only the `All` value produces the unexpected result.
3. Trace `status` from the route into `repository.list_expenses`. SQL logging or a debugger can confirm the generated predicate.
4. Identify that the truthy string `All` is treated as a persisted status even though no expense has that status.
5. Normalize the no-filter case at a deliberate boundary while preserving omitted and specific-status behaviour.
6. Add a regression test that compares returned records, then run the full test suite.

Handling `All` in the route or repository can both be defensible. Score contract clarity, preserved behaviour and reasoning rather than one exact line of code.

## Signals to observe

- Reproduces multiple request variants before editing.
- Reads the route and repository together rather than assuming FastAPI or SQLAlchemy is at fault.
- Distinguishes `None`, an empty string, a UI sentinel and a real database status.
- Uses generated SQL, a debugger or focused logging when useful.
- Adds a test that would reject duplicate or incorrect records, not only the wrong count.
- Preserves specific-status and omitted-filter behaviour.
- Avoids changing seed data to make the reported case pass.
- Can explain why their chosen layer owns normalization.

## Follow-up questions

### Where should `All` be translated into no filter?

Look for discussion of the API contract, reuse of the repository, separation between transport and domain values, and consistency across callers. There is no mandatory layer if the resulting boundary is clear.

### How would you prevent unsupported status values from reaching the query?

Look for FastAPI/Pydantic enum validation, literal types, explicit normalization and defined invalid-input behaviour. The candidate should distinguish static typing from runtime validation.

### Should an unknown status return an empty list or an error?

Either can be valid if tied to a documented API contract. Look for client usability, backwards compatibility and consistency with other filters.

### How would you isolate these tests from local application data?

Look for temporary SQLite databases, dependency overrides, fixtures, transaction rollback and deterministic seeding.

### What changes if more filters are added?

Look for composable query construction where each optional filter contributes one predicate. Avoid prematurely introducing a generic filtering framework.

## Scoring anchors

- **Weak:** special-cases the response, changes seed data, disables filtering or cannot explain why `All` produces no rows.
- **Baseline:** corrects `All` and passes a direct regression test.
- **Good:** compares request variants, preserves existing semantics and writes exact behavioural assertions.
- **Strong:** defines a clear validation/normalization boundary, discusses invalid values and keeps tests isolated and deterministic.
- **Exceptional:** demonstrates disciplined diagnosis, concise Python and strong API-contract reasoning without expanding into an unnecessary repository redesign.
