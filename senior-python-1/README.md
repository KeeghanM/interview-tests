# Senior Python Developer Test

## Instructions

This repository contains a small incident timeline system built with a Python FastAPI backend, a static frontend, and Postgres. The services are Dockerised and are intended to be run together with Docker Compose.

1. Run `docker compose up --build`.
2. Open `http://localhost:8080` to view the dashboard.
3. Open `http://localhost:8000/docs` to inspect the API.
4. Run `docker compose exec api python -m pytest` to run the existing API tests.
5. Follow the below ticket.

## Interview Tickets

### BUG: Order timeline contains events from the wrong order

Support engineers use the order timeline to understand why an order is blocked. They have reported that order `1001` shows a payment event that belongs to a different order.

#### Expected Behavior

- The timeline for an order should only contain events that belong to that order.
- The frontend should display the same timeline that the API returns.
- The failure should be covered by an automated regression test.

#### Actual Behavior

- The timeline for order `1001` includes a payment event from order `1002`.
- The issue is visible in the dashboard and in `GET /api/orders/1001/timeline`.
