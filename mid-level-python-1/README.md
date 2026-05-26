# Mid-Level Python Developer Test

## Instructions

This repository contains a finance API built with Python, FastAPI, SQLAlchemy, and SQLite. It has a local SQLite database which is seeded with random data every time the application is started. It is designed to be fully standalone, and does not require any external services or APIs to run.

1. Create a virtual environment with `python -m venv .venv`.
2. Activate it with `source .venv/bin/activate`.
3. Run `pip install -e ".[dev]"` to install the dependencies.
4. Run `uvicorn app.main:app --reload` to start the development server.
5. Open your browser and navigate to `http://localhost:8000/docs` to view the API.
6. Follow the below ticket.

## Interview Tickets

### BUG: Expense endpoint not returning all tickets

An issue has been reported where the expenses endpoint does not return all tickets when the status filter is set to `All`. If you switch the filter to `Pending` and then remove the status filter entirely, the endpoint returns all tickets correctly.

#### Expected Behavior

The expenses endpoint should return the tickets corresponding to the selected filter at all times. When the status filter is `All`, every expense should be returned.

#### Actual Behavior

The expenses endpoint returns no tickets when requested with `status=All`.

#### Steps to Reproduce

1. Start the application.
2. Open `http://localhost:8000/expenses?status=All`.
3. Observe that the response contains no tickets.
4. Open `http://localhost:8000/expenses?status=Pending`.
5. Open `http://localhost:8000/expenses`.
6. Observe that the response now contains all tickets correctly.
