from sqlalchemy import func, select
from sqlalchemy.orm import Session

from api.models import Incident, Service

SERVICES = [
    {
        "id": "checkout-web",
        "name": "Checkout Web",
        "owner": "Commerce Platform",
        "delay_ms": 650,
        "display_order": 1,
    },
    {
        "id": "search-indexer",
        "name": "Search Indexer",
        "owner": "Commerce Platform",
        "delay_ms": 80,
        "display_order": 2,
    },
    {
        "id": "catalog-api",
        "name": "Catalog API",
        "owner": "Product Data",
        "delay_ms": 220,
        "display_order": 3,
    },
]

INCIDENTS = [
    {
        "id": "INC-401",
        "service_id": "checkout-web",
        "owner": "Commerce Platform",
        "title": "Payment retries elevated",
        "severity": "high",
        "status": "open",
        "opened_at": "2026-07-27T08:15:00Z",
    },
    {
        "id": "INC-402",
        "service_id": "search-indexer",
        "owner": "Commerce Platform",
        "title": "Index queue lagging",
        "severity": "medium",
        "status": "open",
        "opened_at": "2026-07-27T08:42:00Z",
    },
    {
        "id": "INC-403",
        "service_id": "checkout-web",
        "owner": "Commerce Platform",
        "title": "Release rollback completed",
        "severity": "low",
        "status": "resolved",
        "opened_at": "2026-07-26T16:10:00Z",
    },
    {
        "id": "INC-404",
        "service_id": "catalog-api",
        "owner": "Product Data",
        "title": "Product reads timing out",
        "severity": "high",
        "status": "open",
        "opened_at": "2026-07-27T09:05:00Z",
    },
]


def seed_database(session: Session) -> None:
    if session.scalar(select(func.count()).select_from(Service)):
        return

    session.add_all(Service(**service) for service in SERVICES)
    session.flush()
    session.add_all(Incident(**incident) for incident in INCIDENTS)
