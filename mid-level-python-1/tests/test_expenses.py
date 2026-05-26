from fastapi.testclient import TestClient

from app.main import app


def test_all_status_returns_every_expense():
    with TestClient(app) as client:
        all_expenses = client.get("/expenses").json()
        filtered_expenses = client.get("/expenses?status=All").json()

    assert len(filtered_expenses) == len(all_expenses)
