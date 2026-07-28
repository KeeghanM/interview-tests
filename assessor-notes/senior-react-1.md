# Interviewer assessment

Suggested timebox: 45 minutes.

Score out of 30: systematic diagnosis of asynchronous state (6), request ordering and cancellation correctness (7), loading and error-state integrity (5), regression tests (5), maintainability (4), communication and trade-offs (3).

Strong candidates reproduce the race using the deterministic delays, prevent superseded incident and overview requests from committing state, ensure stale data is not presented under a new service heading, cover rapid switching and failures in tests, and explain the limits of their chosen cancellation or request-identity approach.

## Ideal steps

1. Reproduce the issue by selecting `Checkout Web` and immediately selecting `Search Indexer`.
2. Use the network tab to observe that the search responses finish first and the older checkout responses finish later.
3. Call the API endpoints directly or inspect their responses to establish that each response contains the correct service data. The corruption occurs when React commits responses out of order.
4. Trace `selectedServiceId` through both effects and, if useful, log the selected ID when each request starts and resolves.
5. Prevent superseded requests from updating incidents, overview, loading, or error state. `AbortController`, a request identity guard, or a coherent query-library solution are all valid when applied consistently.
6. Clear or explicitly mark old data as stale when selection changes so it is never displayed under the new service heading.
7. Add tests with controlled deferred responses for rapid switching, stale success, stale failure, and loading-state ownership.

## Follow-up

Ask: "How would you make this class of race less likely across a larger application?"

Expected answer: centralize server-state handling in a query layer keyed by service ID, or keep each response tagged with the selection that produced it and update state atomically. The candidate should still understand cancellation and identity checks because cancellation is not always available or guaranteed to stop a response.
