# Senior React Developer Test

## Instructions

This repository contains a service health dashboard built with React, TypeScript, a Node API, and Postgres. The frontend, backend, and database are Dockerised and are intended to be run together with Docker Compose.

1. Run `docker compose up --build`.
2. Open `http://localhost:5173` to view the dashboard.
3. Open `http://localhost:3000/health` to check the API.
4. Follow the below ticket.

## Interview Tickets

### BUG: Service summary does not match selected service

Operations engineers use the dashboard to compare incident volume across services. They have reported that the summary cards show the wrong totals after switching from one service to another.

#### Expected Behavior

- Selecting a service should update both the incident list and the summary cards.
- The summary cards should match the selected service.
- The data shown in the browser should match the API response for the selected service.

#### Actual Behavior

- The incident list changes when a new service is selected.
- The summary cards remain stuck on the first service loaded by the page.
- `GET /api/services/:serviceId/overview` returns the correct data when called directly.
