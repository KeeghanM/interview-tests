from fastapi.testclient import TestClient

from app.main import app


def test_omitting_status_returns_seeded_expenses():
    with TestClient(app) as client:
        response = client.get("/expenses")

    assert response.status_code == 200
    assert {expense["status"] for expense in response.json()} == {
        "Approved",
        "Pending",
        "Rejected",
    }


def test_pending_status_returns_only_pending_expenses():
    with TestClient(app) as client:
        response = client.get("/expenses?status=Pending")

    assert response.status_code == 200
    expenses = response.json()
    assert len(expenses) == 2
    assert all(expense["status"] == "Pending" for expense in expenses)
