# Interviewer assessment

Suggested timebox: 45 minutes.

Score out of 30: systematic diagnosis across boundaries (6), backend data isolation and correctness (6), frontend concurrency and state integrity (6), regression tests (5), maintainability and operational thinking (4), communication and validation of AI-assisted work (3).

A senior answer fixes causes rather than symptoms, treats cross-service data leakage as a correctness boundary, handles request cancellation or identity explicitly, clears misleading stale state, and tests invariants rather than implementation details.

## Ideal steps

1. Reproduce both symptoms: inspect a single service dashboard for incidents from another service with the same owner, then switch quickly from slow `Checkout Web` to fast `Search Indexer` and observe stale data winning.
2. Inspect network timing and call each dashboard endpoint directly. This separates the backend isolation defect from the frontend response-ordering defect.
3. Trace the backend request through Express and Pyodide into `build_dashboard`. Identify that incidents are selected by owner rather than `service_id`, causing both the list and derived summary to include another service's data.
4. Filter by the requested service ID and keep the summary derived from that isolated set. Add tests that assert service identity, incident membership, and summary invariants.
5. Trace the frontend effect and identify that any completed request can replace `dashboard`, even when its service is no longer selected.
6. Abort superseded requests or guard commits with request identity. Ensure stale success, error, and `finally` handlers cannot overwrite the current dashboard, error, or loading state.
7. Clear or explicitly mark the previous dashboard as stale during a selection change, then verify rapid switching with the deterministic delays still enabled.

## Follow-up

Ask: "What would you change to prevent both isolation and stale-response bugs as this dashboard grows?"

Expected answer: establish service ID as the boundary key across storage, API responses, cache keys, and UI state; test that every returned incident matches that key; and use a server-state abstraction or reducer that associates data and request status with the selected service. Strong answers discuss observability for request IDs and invariant failures without relying on logging as the correctness mechanism.
