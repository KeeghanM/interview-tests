# Senior React 1 interviewer guide

Suggested timebox: 75 minutes, starting after the Docker services are healthy and including follow-up discussion.

Score out of 30: systematic diagnosis of asynchronous state (7), superseded-request correctness (8), transition and error-state integrity (6), maintainability (5), communication and trade-offs (4).

This assessment is about ownership of asynchronous state. A complete solution must remain correct under arbitrary response ordering; merely making the documented click sequence less likely is not sufficient.

## Ideal steps

1. Reproduce the issue by switching quickly between services and record which heading, incidents and summary disagree.
2. Use network timing and direct API responses to establish that each response is correct for its requested service.
3. Trace `selectedServiceId` through both effects and associate each completion with the selection that initiated it.
4. Prevent superseded success and failure handlers from committing state. `AbortController`, request identity, effect cleanup or a coherent query-library solution are valid.
5. Ensure an older failure cannot change the current error state. If loading state is introduced, its ownership must also follow the current request.
6. Clear old data or visibly retain it as stale so it is never presented as belonging to the new heading.

The user must remain able to switch services quickly. Disabling controls or adding a debounce without enforcing response ownership masks the reproduction rather than fixing it.

## Signals to observe

- Reproduces timing-dependent behaviour reliably rather than clicking until it appears.
- Separates backend data correctness from frontend state corruption.
- Understands that effect dependencies do not guarantee response order.
- Guards success, expected aborts and real failures consistently, plus loading completion if loading state is introduced.
- Can explain transport cancellation versus ignoring a stale result.
- Models which service owns incidents, overview and request status.
- Discusses partial loading and stale-while-revalidate as product decisions.
- Avoids replacing the architecture unless the replacement materially simplifies correctness.

## Follow-up questions

### Is `AbortController` enough?

Look for awareness that cancellation should be passed to `fetch`, expected abort errors should not surface, and cancellation may not stop server work or every asynchronous source. Request identity remains a useful correctness mechanism.

### Should incidents and overview load independently?

Either design can work. Look for explicit ownership, whether partial data is useful, and how the UI prevents resources from different services appearing together.

### How would React Query change this implementation?

Look for service IDs in query keys, cached data per service, cancellation, stale data policy and separate query statuses. Naming the library without explaining those mechanics is weak.

### How would you test the race without flaky timers?

Look for deferred promises whose resolution order the test controls, assertions before and after each completion, and coverage of stale rejection and `finally` behaviour.

### What should the UI show while switching services?

Clearing, skeletons and explicitly stale previous data can all be valid. The invariant is that old data must not appear to belong to the new service.

### What does React Strict Mode change here?

This starter does not enable Strict Mode. Look for an understanding of the development effect setup/cleanup checks it would add and the need for cleanup to be safe. Strict Mode can expose lifecycle defects but would not be the cause of incorrect request ownership.

## Scoring anchors

- **Weak:** changes delays, disables switching, clears data without preventing stale commits or assumes the API returned mixed data.
- **Baseline:** prevents an older successful response from replacing the latest selection.
- **Good:** also handles stale errors and misleading transition state, plus loading ownership if loading state is added.
- **Strong:** models resource identity clearly, explains cancellation limits and makes an intentional partial-loading decision.
- **Exceptional:** provides a concise implementation while articulating how the same invariant would scale through a server-state abstraction.
