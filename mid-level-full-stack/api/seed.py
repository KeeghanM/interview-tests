from datetime import date
from decimal import Decimal

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from api.models import Category, Employee, Expense

EMPLOYEES = [
    {"name": "Maya Chen", "initials": "MC", "email": "maya@northstar.test"},
    {"name": "Oliver Grant", "initials": "OG", "email": "oliver@northstar.test"},
    {"name": "Sofia Rossi", "initials": "SR", "email": "sofia@northstar.test"},
    {"name": "Noah Williams", "initials": "NW", "email": "noah@northstar.test"},
]

CATEGORIES = [
    {"name": "Travel"},
    {"name": "Meals"},
    {"name": "Software"},
    {"name": "Office"},
]

EXPENSES = [
    (3, 1, "Eurostar", "Client workshop in Paris", "184.50", date(2026, 7, 24), "Pending"),
    (1, 3, "Figma", "Product design seats", "96.00", date(2026, 7, 22), "Approved"),
    (4, 2, "Dishoom", "Quarterly planning dinner", "142.80", date(2026, 7, 19), "Pending"),
    (2, 1, "Northern Rail", "Manchester partner visit", "86.40", date(2026, 7, 17), "Approved"),
    (1, 4, "Present & Correct", "Workshop stationery", "38.25", date(2026, 7, 14), "Rejected"),
    (3, 3, "Notion", "Annual team workspace", "312.00", date(2026, 7, 9), "Approved"),
    (4, 2, "WatchHouse", "Candidate interviews", "27.60", date(2026, 7, 7), "Approved"),
]


def seed_database(session: Session) -> None:
    if session.scalar(select(func.count()).select_from(Expense)):
        return

    session.add_all(Employee(**employee) for employee in EMPLOYEES)
    session.add_all(Category(**category) for category in CATEGORIES)
    session.flush()

    session.add_all(
        Expense(
            employee_id=employee_id,
            category_id=category_id,
            merchant=merchant,
            description=description,
            amount=Decimal(amount),
            submitted_at=submitted_at,
            status=status,
        )
        for employee_id, category_id, merchant, description, amount, submitted_at, status in EXPENSES
    )
