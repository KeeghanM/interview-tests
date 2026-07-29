# Senior Python 1 interviewer guide

Suggested timebox: 75 minutes, starting after the Docker services are healthy and including follow-up discussion.

Score out of 30: diagnosis across browser, API and data model (8), query correctness and data isolation (9), preserved API behaviour (4), maintainability and scope judgment (5), communication and trade-offs (4).

This assessment is about discovering and enforcing a data-isolation invariant. The candidate-facing ticket intentionally describes only the observed cross-order leak; do not reveal the relationship responsible for it.

## Ideal steps

1. Reproduce the problem in the dashboard and call the timeline endpoint directly to show that the API already contains the unrelated event.
2. Compare affected and unaffected orders, looking for data relationships that explain the pattern.
3. Trace the timeline query and inspect the schema and deterministic seed data.
4. Identify that payment events are selected through a relationship broader than the requested order, despite a direct order association being available.
5. Correct the query at the data boundary while preserving order events, payment events, chronological ordering and unknown-order behaviour.

Filtering the API payload or frontend after retrieving unrelated rows is not an acceptable isolation fix. The query should not retrieve another order's payment data.

## Signals to observe

- Establishes whether the leak originates in the frontend or API before editing.
- Uses the pattern across orders to form a relationship hypothesis.
- Reads query joins, schema constraints and seed data together.
- Preserves `UNION ALL`, chronological output and 404 behaviour.
- Treats data isolation as a correctness and potentially security-relevant boundary.
- Separates the immediate safe fix from larger schema changes.
- Can explain the query and every changed parameter.

## Follow-up questions

### What invariant did the original query violate?

Look for a precise statement that every timeline event must belong to the requested order. Customer ownership is not narrow enough to establish order-event ownership.

### Should payments store both order and customer identifiers?

Look for discussion of normalization, query convenience, denormalized data, consistency constraints and migration risk. Removing a redundant field may be desirable but is outside the immediate fix unless explicitly requested.

### What database constraints could prevent inconsistent associations?

Look for foreign keys, deriving customer through the order, composite constraints or controlled writes. A foreign key on each column independently does not prove that they refer to the same relationship.

### Why use `UNION ALL`, and how should ties be ordered?

Look for preservation of legitimate duplicate-shaped events, deterministic secondary ordering and awareness that ordering only by timestamp leaves ties unspecified.

### How would you test this query?

Look for disposable database state, same-customer orders, each order's own payments, multiple payments, overlapping amounts and assertions over event identity or source rather than formatted message alone.

### Would you introduce a repository layer now?

Either answer can be valid. Look for whether extraction materially improves reuse or isolates database concerns rather than conformity to a preferred architecture.

## Scoring anchors

- **Weak:** filters in the frontend, removes payment events, changes fixture relationships or cannot explain why the unrelated event appears.
- **Baseline:** corrects the query for the reported order and preserves the visible timeline.
- **Good:** derives the relationship from evidence and preserves ordering and 404 behaviour.
- **Strong:** articulates the isolation invariant, uses convincing data examples and separates query repair from schema hardening.
- **Exceptional:** demonstrates precise SQL and Python reasoning, identifies integrity risks and proposes proportionate prevention without turning the exercise into an unrequested migration.
