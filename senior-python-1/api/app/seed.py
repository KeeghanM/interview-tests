from typing import Any

import psycopg


def initialise_database(connection: psycopg.Connection[tuple[Any, ...]]) -> None:
    with connection.cursor() as cursor:
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS customers (
              id INTEGER PRIMARY KEY,
              name TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS orders (
              id INTEGER PRIMARY KEY,
              customer_id INTEGER NOT NULL REFERENCES customers(id),
              status TEXT NOT NULL,
              total_pence INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS order_events (
              id SERIAL PRIMARY KEY,
              order_id INTEGER NOT NULL REFERENCES orders(id),
              event_type TEXT NOT NULL,
              message TEXT NOT NULL,
              created_at TIMESTAMPTZ NOT NULL
            );

            CREATE TABLE IF NOT EXISTS payments (
              id SERIAL PRIMARY KEY,
              order_id INTEGER NOT NULL REFERENCES orders(id),
              customer_id INTEGER NOT NULL REFERENCES customers(id),
              amount_pence INTEGER NOT NULL,
              status TEXT NOT NULL,
              created_at TIMESTAMPTZ NOT NULL
            );
            """
        )
        cursor.execute("TRUNCATE payments, order_events, orders, customers RESTART IDENTITY CASCADE")
        cursor.execute(
            """
            INSERT INTO customers (id, name) VALUES
              (501, 'Northwind Logistics'),
              (502, 'Acme Studio');

            INSERT INTO orders (id, customer_id, status, total_pence) VALUES
              (1001, 501, 'blocked', 12350),
              (1002, 501, 'paid', 2999),
              (1003, 502, 'processing', 6400);

            INSERT INTO order_events (order_id, event_type, message, created_at) VALUES
              (1001, 'created', 'Order was created from checkout', '2026-05-10T09:00:00Z'),
              (1001, 'risk_review', 'Manual fraud review requested', '2026-05-10T09:04:00Z'),
              (1001, 'blocked', 'Order blocked pending payment verification', '2026-05-10T09:08:00Z'),
              (1002, 'created', 'Order was created from checkout', '2026-05-10T09:15:00Z'),
              (1002, 'released', 'Order released to fulfilment', '2026-05-10T09:20:00Z');

            INSERT INTO payments (order_id, customer_id, amount_pence, status, created_at) VALUES
              (1001, 501, 12350, 'requires_action', '2026-05-10T09:03:00Z'),
              (1002, 501, 2999, 'captured', '2026-05-10T09:18:00Z'),
              (1003, 502, 6400, 'captured', '2026-05-10T09:30:00Z');
            """
        )
    connection.commit()
