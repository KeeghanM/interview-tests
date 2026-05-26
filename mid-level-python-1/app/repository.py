from sqlalchemy import select
from sqlalchemy.orm import Session

from .models import Category, Employee, Expense


def list_expenses(db: Session, status: str | None = None) -> list[Expense]:
    query = select(Expense).order_by(Expense.date.desc())

    if status:
        query = query.where(Expense.status == status)

    return list(db.scalars(query).all())


def list_employees(db: Session) -> list[Employee]:
    return list(db.scalars(select(Employee).order_by(Employee.name)).all())


def list_categories(db: Session) -> list[Category]:
    return list(db.scalars(select(Category).order_by(Category.name)).all())


def update_expense_status(db: Session, expense_id: int, status: str) -> Expense | None:
    expense = db.get(Expense, expense_id)
    if expense is None:
        return None

    expense.status = status
    db.commit()
    db.refresh(expense)
    return expense
