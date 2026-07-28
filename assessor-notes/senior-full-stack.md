# Senior Full-Stack interviewer guide

Suggested timebox: 75 minutes, including tests and follow-up discussion.

Score out of 30: systematic diagnosis across boundaries (6), backend data isolation and correctness (6), frontend concurrency and state integrity (6), regression tests (5), maintainability and operational thinking (4), communication and validation of AI-assisted work (3).

This assessment contains two independent failures. Strong candidates separate backend data isolation from frontend response ownership, fix both invariants and resist changes that merely hide the deterministic reproduction.

## Ideal steps

1. Reproduce inconsistent data in a single service dashboard and inconsistent state after rapid switching.
2. Inspect individual endpoint responses and request timing to determine which symptoms already exist in the API and which arise in the browser.
3. Trace the backend request through Express and Pyodide into `build_dashboard`, then compare the selection predicate with service and incident identities.
4. Isolate incidents by the requested service and keep the summary derived from the same set.
5. Trace the frontend effect and associate each dashboard completion with the selection that initiated it.
6. Abort superseded requests or guard all state commits with request identity, including errors and loading completion.
7. Clear old data or explicitly present it as stale during transitions.
8. Add backend isolation coverage and controlled frontend race coverage, then verify with deterministic delays still enabled.

Changing fixture ownership, removing delays, filtering leaked incidents in the UI, disabling rapid switching or displaying the response's old service as the current selection are not complete fixes.

## Signals to observe

- Recognizes that one symptom can have more than one cause.
- Uses direct endpoint responses to split backend and frontend hypotheses.
- Treats service identity as the boundary key for list data and derived summaries.
- Protects success, error and loading state from superseded requests.
- Understands that aborting browser fetch does not necessarily cancel queued server work.
- Tests invariants with alternate identities rather than only the reported IDs.
- Keeps internal timing fields out of public-contract decisions.
- Explains which changes are immediate fixes and which are future hardening.
- Challenges AI suggestions that remove reproduction mechanisms or add unnecessary architecture.

## Follow-up questions

### How did you prove there were two defects?

Look for comparison of direct API payloads with rendered state and controlled observation of request completion order.

### What is the central identity invariant?

Look for service ID across backend filtering, response data, summaries, request identity, cache keys and rendered state. Team ownership is metadata, not service identity.

### Is frontend cancellation sufficient here?

Look for the distinction between aborting the HTTP consumer, queued Pyodide execution and guarding client commits. Correctness should not depend solely on server cancellation succeeding.

### Should the dashboard endpoint return a summary or should React derive it?

Both can be valid. Look for data volume, consistency, reuse, authorization and avoiding two sources of truth. In the current API, the summary and list must derive from the same isolated set.

### Which tests provide the most confidence?

Look for backend fixtures with services sharing an owner, exact incident membership, summary invariants, and frontend deferred requests covering stale success, failure and completion.

### What would you monitor in production?

Look for request/service IDs in structured logs, response timing, stale-request metrics where available and assertions or telemetry for identity mismatches. Logging should aid diagnosis, not provide correctness.

### How far would you tidy the surrounding code?

Look for removal of internal `delay_ms` from public DTOs as a reasonable adjacent observation, balanced against the need to keep the interview fix focused and preserve deterministic timing.

## Scoring anchors

- **Weak:** finds only one defect, removes delays, changes fixtures or filters leaked data after the backend boundary.
- **Baseline:** isolates backend incidents and prevents an older successful dashboard response from replacing current data.
- **Good:** proves both causes independently, protects all frontend state paths and adds meaningful regression coverage.
- **Strong:** models service ownership coherently, tests adversarial ordering and explains cancellation and API-boundary trade-offs.
- **Exceptional:** delivers a focused, operationally sound fix with strong invariant-based tests and clear judgment about what not to change.
