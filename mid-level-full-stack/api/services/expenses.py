from collections.abc import Sequence

from sqlalchemy.orm import Session

from api.models import Expense
from api.repositories.expenses import list_expenses as find_expenses
from api.schemas import DashboardRead, DashboardTotals, ExpenseRead


def to_expense_read(expense: Expense) -> ExpenseRead:
    return ExpenseRead(
        id=expense.id,
        merchant=expense.merchant,
        description=expense.description,
        amount=float(expense.amount),
        date=expense.submitted_at,
        status=expense.status,
        employee=expense.employee.name,
        employee_initials=expense.employee.initials,
        category=expense.category.name,
    )


def get_expenses(session: Session, status: str | None = None) -> list[ExpenseRead]:
    return [to_expense_read(expense) for expense in find_expenses(session, status)]


def sum_status(expenses: Sequence[Expense], status: str) -> float:
    return float(sum((expense.amount for expense in expenses if expense.status == status), start=0))


def get_dashboard(session: Session) -> DashboardRead:
    expenses = find_expenses(session)
    return DashboardRead(
        totals=DashboardTotals(
            claimed=float(sum((expense.amount for expense in expenses), start=0)),
            pending=sum_status(expenses, "Pending"),
            approved=sum_status(expenses, "Approved"),
            rejected=sum_status(expenses, "Rejected"),
        ),
        pending_count=sum(expense.status == "Pending" for expense in expenses),
        recent_expenses=[to_expense_read(expense) for expense in expenses[:5]],
    )
