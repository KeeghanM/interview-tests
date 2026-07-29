# Mid-Level Python Interview Exercise

## Instructions

This repository contains a finance API built with Python, FastAPI, SQLAlchemy, and SQLite. It has a local SQLite database which is seeded with deterministic sample data every time the application is started. It is designed to be fully standalone, and does not require any external services or APIs to run.

1. Run `uv sync` to create the environment and install the dependencies.
2. Run `uv run uvicorn app.main:app --reload` to start the development server.
3. Open your browser and navigate to `http://localhost:8000/docs` to view the API.
4. Follow the ticket below.

## Interview Tickets

### BUG: Expense endpoint not returning all expenses

An issue has been reported where the expenses endpoint does not return all expenses when the status filter is set to `All`. If you switch the filter to `Pending` and then remove the status filter entirely, the endpoint returns all expenses correctly.

#### Expected Behavior

The expenses endpoint should return the expenses corresponding to the selected filter at all times. When the status filter is `All`, every expense should be returned.

#### Actual Behavior

The expenses endpoint returns no expenses when requested with `status=All`.

#### Steps to Reproduce

1. Start the application.
2. Open `http://localhost:8000/expenses?status=All`.
3. Observe that the response contains no expenses.
4. Open `http://localhost:8000/expenses?status=Pending`.
5. Open `http://localhost:8000/expenses`.
6. Observe that the response now contains all expenses correctly.
