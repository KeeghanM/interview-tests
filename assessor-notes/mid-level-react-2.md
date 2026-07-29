# Mid-Level React 2 interviewer guide

Suggested timebox: 45 minutes, including implementation and follow-up discussion.

Score out of 20: acceptance-criteria coverage (6), sorting correctness (5), state and type design (4), maintainability and communication (5).

This is a small feature task. The signal comes from tracing an existing data flow, modelling the new states, implementing all cases coherently and deciding how much abstraction is proportionate.

## Ideal steps

1. Run the application and confirm the current dropdown supports only one direction for amount and date.
2. Trace `sortBy` from the select through the Zustand store to the comparator in `ExpensesTable`.
3. Extend `SortByType` so each field and direction has a distinct valid value, then add the four requested options.
4. Update the comparator to compare amounts numerically and dates chronologically in both directions.
5. Manually verify all four choices in the UI with data that distinguishes each direction.

The existing `.filter(...).sort(...)` chain sorts the new array returned by `filter`; an additional defensive copy is not required there. If a candidate notices direct sorting elsewhere in the application, treat that as an adjacent observation rather than part of this ticket.

## Signals to observe

- Finds the store, select and comparator without reading every file linearly.
- Turns field and direction into explicit valid states instead of adding loosely related booleans.
- Checks actual data types before choosing numeric, string or date comparison.
- Covers every acceptance criterion rather than stopping after the first working option.
- Verifies each option with values that clearly distinguish the two directions.
- Avoids coupling display labels to comparator logic.
- Chooses an implementation proportionate to four options.
- Communicates assumptions about default order, invalid dates and ties.

## Follow-up questions

### How would you keep the dropdown and comparator in sync as options are added?

Look for a shared typed option configuration or exhaustive comparator selection. A configuration-driven solution is a positive signal, not a requirement for four fixed choices.

### Should sort state be one value or separate field and direction values?

Both can be valid. Look for discussion of valid-state modelling, UI needs, URL persistence and whether separate values permit unsupported combinations.

### Where should this sorting happen if the dataset becomes very large?

Look for server-side sorting, API parameters, React Query keys, pagination and stable contracts. Moving work to the server should follow product and scale needs, not happen pre-emptively.

### How would you test this?

Look for deterministic fixtures, each direction, numeric values that expose lexicographic mistakes, dates that expose chronological mistakes and an appropriate split between comparator and UI integration coverage.

### Would you refactor the existing filter and sort pipeline?

Look for scope judgment. A small extraction that clarifies the comparator may be worthwhile; redesigning unrelated filters is not necessary.

## Scoring anchors

- **Weak:** hard-codes visible rows, implements only some options, compares amounts as strings or cannot trace the state flow.
- **Baseline:** all four options work in the UI with straightforward comparator branches.
- **Good:** models valid states clearly, handles data types correctly and verifies every direction with meaningful examples.
- **Strong:** keeps options and behaviour difficult to desynchronize, communicates assumptions and avoids unnecessary abstraction.
- **Exceptional:** produces a concise, extensible implementation and can explain how the design would change for server-side sorting without broadening the current ticket.
