# Mid-Level Full-Stack interviewer guide

Suggested timebox: 45 minutes, including tests and follow-up discussion.

Score out of 20: diagnosis across boundaries (6), correctness and preserved behaviour (4), test quality (4), layer ownership and maintainability (3), communication and validation of AI-assisted work (3).

This is a cross-boundary debugging assessment. The fix is deliberately small; the signal comes from proving which layer changes correct data into incorrect behaviour and choosing an appropriate contract boundary.

## Ideal steps

1. Reproduce the empty initial table and verify that specific status selections return matching rows.
2. Inspect the browser request and response, then call the expenses endpoint directly to establish whether the API or rendering layer owns the empty result.
3. Trace the value through React, Express, the Pyodide bridge and the Python filter.
4. Identify that the no-filter display value is being treated as a real status.
5. Correct the semantics at a deliberate boundary rather than masking an incorrect response in rendering code.
6. Preserve omitted and specific-status behaviour, add the missing regression test and run all checks.

Sending no query parameter for the no-filter state or supporting an explicit API sentinel can both be valid if the contract and tests are coherent. Do not grade only one spelling or layer as correct.

## Signals to observe

- Reproduces through the UI before changing implementation details.
- Uses network evidence or direct requests to identify the failing side of the HTTP boundary.
- Follows serialization across JavaScript and Python without assuming the bridge is inherently responsible.
- Checks existing tests but does not treat them as a substitute for reproducing the product behaviour.
- Adds coverage at a boundary that protects the contract, with exact assertions.
- Keeps UI labels separate from machine values when that distinction is useful.
- Avoids broad rewrites of the bridge or frontend for a narrow semantic bug.
- Can explain and validate AI-generated suggestions rather than accepting them on authority.

## Follow-up questions

### Which layer should own the no-filter meaning?

Look for an explicit API contract and a distinction between product labels and domain values. UI omission, HTTP normalization and business-logic normalization are defensible when consistently applied.

### What should happen for an unsupported status?

Look for a documented choice between validation errors and empty results, plus awareness of compatibility and client expectations.

### Which test boundary gives the best regression protection?

Look for the trade-offs among a Python unit test, bridge test, HTTP integration test and browser test. Strong candidates usually want at least one contract-level test without duplicating every case at every layer.

### What risks does the Python runtime bridge introduce?

Look for serialization, startup cost, error propagation, concurrency and runtime ownership. The candidate need not redesign it for this ticket.

### Would you also address rapid filter switching?

The frontend can exhibit request-ordering concerns, but they are not part of the reported reproduction. Look for awareness paired with deliberate scope control.

## Scoring anchors

- **Weak:** patches the rendered table, changes fixture data or cannot identify which boundary first returns the wrong result.
- **Baseline:** finds the Python filtering behaviour, makes `All` work and passes a regression test.
- **Good:** demonstrates the request path with evidence, preserves all supported filters and tests the contract accurately.
- **Strong:** makes a well-reasoned ownership decision, distinguishes display and machine values and discusses integration coverage proportionately.
- **Exceptional:** navigates every boundary efficiently, communicates hypotheses clearly and resists both under-fixing and unrelated architectural cleanup.
