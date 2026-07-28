from fastapi.testclient import TestClient

from app.main import app


def test_lists_seeded_orders():
    with TestClient(app) as client:
        response = client.get("/api/orders")

    assert response.status_code == 200
    assert [order["id"] for order in response.json()] == [1001, 1002, 1003]


def test_unknown_order_returns_not_found():
    with TestClient(app) as client:
        response = client.get("/api/orders/9999/timeline")

    assert response.status_code == 404
    assert response.json() == {"detail": "Order not found"}
