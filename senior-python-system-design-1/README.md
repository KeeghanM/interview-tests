# Senior Python Developer Test

## Instructions

This repository contains a small incident timeline system built with a Python FastAPI backend, a static frontend, and Postgres. The services are Dockerised and are intended to be run together with Docker Compose.

1. Run `docker compose up --build`.
2. Open `http://localhost:8080` to view the dashboard.
3. Open `http://localhost:8000/docs` to inspect the API.
4. Follow the below ticket.

## Interview Tickets

### BUG: Order timeline contains events from the wrong order

Support engineers use the order timeline to understand why an order is blocked. They have reported that order `1001` shows payment events that belong to a different order for the same customer.

#### Expected Behavior

- The timeline for an order should only contain events that belong to that order.
- Payment events should be associated by `order_id`, not by customer-level data.
- The frontend should display the same timeline that the API returns.

#### Actual Behavior

- The timeline for order `1001` includes a payment event from order `1002` because both orders belong to the same customer.
- The issue is visible in the dashboard and in `GET /api/orders/1001/timeline`.
