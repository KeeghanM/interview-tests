from sqlalchemy.orm import Session

from .models import Category, Employee, Expense


def seed_database(db: Session) -> None:
    db.query(Expense).delete()
    db.query(Category).delete()
    db.query(Employee).delete()

    employees = [
        Employee(name="Alex Morgan", email="alex@example.com", role="Engineer"),
        Employee(name="Priya Shah", email="priya@example.com", role="Product Manager"),
        Employee(name="Sam Taylor", email="sam@example.com", role="Designer"),
    ]
    categories = [
        Category(name="Travel", active=1),
        Category(name="Meals", active=1),
        Category(name="Software", active=1),
    ]
    db.add_all([*employees, *categories])
    db.flush()

    db.add_all(
        [
            Expense(
                employee_id=employees[0].id,
                amount=82.45,
                category="Travel",
                description="Train to client workshop",
                date="2026-05-02",
                status="Pending",
                receipt="receipt-1001.pdf",
            ),
            Expense(
                employee_id=employees[1].id,
                amount=36.10,
                category="Meals",
                description="Team lunch after planning session",
                date="2026-05-05",
                status="Approved",
                receipt="receipt-1002.pdf",
            ),
            Expense(
                employee_id=employees[2].id,
                amount=149.00,
                category="Software",
                description="Prototype design tool subscription",
                date="2026-05-08",
                status="Rejected",
                receipt=None,
            ),
            Expense(
                employee_id=employees[0].id,
                amount=18.75,
                category="Meals",
                description="Breakfast before early client call",
                date="2026-05-11",
                status="Pending",
                receipt="receipt-1004.pdf",
            ),
        ]
    )
    db.commit()
