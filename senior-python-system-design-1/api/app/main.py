from contextlib import asynccontextmanager
from collections.abc import AsyncIterator

import psycopg
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .database import DATABASE_URL, get_connection
from .seed import initialise_database


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    with psycopg.connect(DATABASE_URL) as connection:
        initialise_database(connection)
    yield


app = FastAPI(title="Order Timeline API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/orders")
def list_orders(connection=Depends(get_connection)):
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT o.id, c.name AS customer_name, o.status, o.total_pence
            FROM orders o
            JOIN customers c ON c.id = o.customer_id
            ORDER BY o.id
            """
        )
        return cursor.fetchall()


@app.get("/api/orders/{order_id}/timeline")
def get_order_timeline(order_id: int, connection=Depends(get_connection)):
    with connection.cursor() as cursor:
        cursor.execute("SELECT id, customer_id, status FROM orders WHERE id = %s", (order_id,))
        order = cursor.fetchone()
        if order is None:
            raise HTTPException(status_code=404, detail="Order not found")

        cursor.execute(
            """
            SELECT event_type AS type, message, created_at
            FROM order_events
            WHERE order_id = %(order_id)s
            UNION ALL
            SELECT
              'payment_' || p.status AS type,
              'Payment ' || p.status || ' for GBP ' || to_char(p.amount_pence / 100.0, 'FM9999990.00') AS message,
              p.created_at
            FROM payments p
            JOIN orders o ON o.customer_id = p.customer_id
            WHERE o.id = %(order_id)s
            ORDER BY created_at
            """,
            {"order_id": order_id},
        )
        return {"order": order, "timeline": cursor.fetchall()}
