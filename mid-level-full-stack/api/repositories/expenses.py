from collections.abc import Sequence

from sqlalchemy import Select, desc, select
from sqlalchemy.orm import Session, joinedload

from api.models import Expense


def list_expenses(session: Session, status: str | None = None) -> Sequence[Expense]:
    statement: Select[tuple[Expense]] = (
        select(Expense)
        .options(joinedload(Expense.employee), joinedload(Expense.category))
        .order_by(desc(Expense.submitted_at), desc(Expense.id))
    )

    if status:
        statement = statement.where(Expense.status == status)

    return session.scalars(statement).all()
