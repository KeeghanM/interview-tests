import time
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from typing import Annotated

import psycopg
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .database import DATABASE_URL, DatabaseConnection, get_connection
from .schemas import HealthOut, OrderOut, TimelineEventOut, TimelineOrderOut, TimelineOut
from .seed import initialise_database


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    for attempt in range(1, 31):
        try:
            with psycopg.connect(DATABASE_URL) as connection:
                initialise_database(connection)
            break
        except psycopg.OperationalError:
            if attempt == 30:
                raise
            time.sleep(1)
    yield


app = FastAPI(title="Order Timeline API", lifespan=lifespan)
Connection = Annotated[DatabaseConnection, Depends(get_connection)]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", response_model=HealthOut)
def health() -> HealthOut:
    return HealthOut(status="ok")


@app.get("/api/orders", response_model=list[OrderOut])
def list_orders(connection: Connection) -> list[OrderOut]:
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT o.id, c.name AS customer_name, o.status, o.total_pence
            FROM orders o
            JOIN customers c ON c.id = o.customer_id
            ORDER BY o.id
            """
        )
        return [OrderOut.model_validate(order) for order in cursor.fetchall()]


@app.get("/api/orders/{order_id}/timeline", response_model=TimelineOut)
def get_order_timeline(order_id: int, connection: Connection) -> TimelineOut:
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
        return TimelineOut(
            order=TimelineOrderOut.model_validate(order),
            timeline=[TimelineEventOut.model_validate(event) for event in cursor.fetchall()],
        )
