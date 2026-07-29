import os
from collections.abc import Iterator
from typing import Any

import psycopg
from psycopg.rows import dict_row

DATABASE_URL = os.environ["DATABASE_URL"]
type DatabaseConnection = psycopg.Connection[dict[str, Any]]


def get_connection() -> Iterator[DatabaseConnection]:
    with psycopg.connect(DATABASE_URL, row_factory=dict_row) as connection:
        yield connection
