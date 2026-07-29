from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.database import get_session
from api.schemas import DashboardRead
from api.services.expenses import get_dashboard

router = APIRouter(prefix="/dashboard", tags=["dashboard"])
DatabaseSession = Annotated[Session, Depends(get_session)]


@router.get("", response_model=DashboardRead)
def dashboard_index(session: DatabaseSession) -> DashboardRead:
    return get_dashboard(session)
