# Senior React Developer Test

## Instructions

This repository contains a service health dashboard built with React, TypeScript, a Node API, and Postgres. The frontend, backend, and database are Dockerised and are intended to be run together with Docker Compose.

1. Run `docker compose up --build`.
2. Open `http://localhost:5173` to view the dashboard.
3. Open `http://localhost:3000/health` to check the API.
4. Follow the below ticket.

## Interview Tickets

### BUG: Dashboard can show data from multiple services after quick switching

Operations engineers use the dashboard during incidents and often switch between services quickly. They have reported that the selected service heading, incident list, and summary cards can get out of sync.

#### Expected Behavior

- The selected service, incident list, and summary cards should always describe the same service.
- Switching services should not allow older API responses to overwrite newer selections.
- Loading or error states should not leave stale data that appears to belong to the current service.

#### Actual Behavior

- After switching services quickly, the dashboard can show a selected service with incident or summary data from a previously selected service.

#### Reproduction Steps

1. Open the dashboard in the browser.
2. Select `Checkout Web`, then immediately select `Search Indexer`.
3. Observe that the selected service heading changes to `Search Indexer`.
4. Observe that the incident list or summary cards can change to data from a previously selected service.
