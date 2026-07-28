# Interviewer assessment

Suggested timebox: 45 minutes.

Score out of 30: diagnosis across the endpoint and data model (6), query correctness and data isolation (8), edge cases and API behaviour (5), regression tests (5), maintainability (3), communication and trade-offs (3).

Strong candidates identify the customer-level payment join as the isolation failure, constrain payment events by `order_id`, preserve the combined chronological timeline and 404 behaviour, test orders that share a customer as well as unrelated orders, and avoid masking the bug in the frontend.

## Ideal steps

1. Reproduce the timeline problem in the dashboard and call `/api/orders/1001/timeline` directly to show that the API already contains order `1002`'s payment.
2. Compare orders `1001` and `1002` and notice that they share a customer, which suggests the wrong association boundary.
3. Trace the endpoint query and inspect the schema. Confirm that `payments` already has an `order_id`, but the query joins payments through `customer_id`.
4. Replace the customer-level association with an order-level condition using the requested `order_id`.
5. Verify that order events and payment events remain combined in chronological order and that unknown orders still return 404.
6. Add regression tests proving that order `1001` includes its own payment, excludes order `1002`'s payment, and does not affect an unrelated customer's order.

## Follow-up

Ask: "How would you prevent another query from accidentally crossing this data-isolation boundary?"

Expected answer: make `order_id` the single authoritative payment relationship where possible, avoid or justify redundant association fields, enforce referential integrity, and include fixtures where multiple orders share a customer. Repository-level tests should assert both inclusion and exclusion, not only event counts.
