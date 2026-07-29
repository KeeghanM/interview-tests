from typing import Annotated

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from api.database import get_session
from api.schemas import ExpenseRead
from api.services.expenses import get_expenses

router = APIRouter(prefix="/expenses", tags=["expenses"])
DatabaseSession = Annotated[Session, Depends(get_session)]


@router.get("", response_model=list[ExpenseRead])
def expenses_index(
    session: DatabaseSession,
    status: Annotated[str | None, Query(max_length=20)] = None,
) -> list[ExpenseRead]:
    return get_expenses(session, status)
