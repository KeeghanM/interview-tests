# Mid-Level Full-Stack interviewer guide

Suggested timebox: 45 minutes, including implementation and follow-up discussion.

Score out of 20: diagnosis across boundaries (7), correctness and preserved behaviour (5), layer ownership and maintainability (4), communication and validation of AI-assisted work (4).

This is a cross-boundary debugging assessment. The fix is deliberately small; the signal comes from proving which layer changes correct data into incorrect behaviour and choosing an appropriate contract boundary.

## Ideal steps

1. Reproduce the empty initial table and verify that specific status selections return matching rows.
2. Inspect the browser request and response, then call the expenses endpoint directly to establish whether the API or rendering layer owns the empty result.
3. Trace the value through the typed Zustand store, React Query hook, FastAPI route, Python service and SQLAlchemy repository.
4. Identify that the no-filter display value is being treated as a real status.
5. Correct the semantics at a deliberate boundary rather than masking an incorrect response in rendering code.
6. Preserve omitted and specific-status behaviour and validate the change across the API and UI.

Sending no query parameter for the no-filter state or supporting an explicit API sentinel can both be valid if the contract is coherent. Do not grade only one spelling or layer as correct.

## Signals to observe

- Reproduces through the UI before changing implementation details.
- Uses network evidence or direct requests to identify the failing side of the HTTP boundary.
- Uses the application structure to follow server state through the query, route, service and repository rather than reading every file linearly.
- Confirms whether SQLite returns rows for each repository query before assuming serialization or rendering is responsible.
- Keeps UI labels separate from machine values when that distinction is useful.
- Avoids broad rewrites of the API or frontend for a narrow semantic bug.
- Can explain and validate AI-generated suggestions rather than accepting them on authority.

## Follow-up questions

### Which layer should own the no-filter meaning?

Look for an explicit API contract and a distinction between product labels and domain values. UI omission, HTTP normalization and business-logic normalization are defensible when consistently applied.

### What should happen for an unsupported status?

Look for a documented choice between validation errors and empty results, plus awareness of compatibility and client expectations.

### What tests would you add for this change?

Look for a concrete regression case for the no-filter contract, specific-status cases, unsupported values and a sensible split between service or repository tests, FastAPI integration coverage and a small browser-level check. The candidate does not need to implement these during the exercise.

### Why separate repository, service and route concerns here?

Look for ownership rather than ceremony: the repository owns persistence, the service coordinates domain behaviour and the route translates HTTP. A strong candidate can also explain when this split would be unnecessary.

### What does `uv` add to this project?

Look for reproducible Python and dependency versions, lockfile-backed environments and simpler setup. Strong candidates may contrast this with containers, system Python and manually managed virtual environments.

### Would you also address rapid filter switching?

The frontend can exhibit request-ordering concerns, but they are not part of the reported reproduction. Look for awareness paired with deliberate scope control.

## Scoring anchors

- **Weak:** patches the rendered table, changes fixture data or cannot identify which boundary first returns the wrong result.
- **Baseline:** finds the Python filtering behaviour, makes `All` work and verifies the reported flow.
- **Good:** demonstrates the request path with evidence and preserves all supported filters.
- **Strong:** makes a well-reasoned ownership decision and distinguishes display values from machine values.
- **Exceptional:** navigates every boundary efficiently, communicates hypotheses clearly and resists both under-fixing and unrelated architectural cleanup.
