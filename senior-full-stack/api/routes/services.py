import asyncio
from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from api.database import get_session
from api.schemas import DashboardRead, ErrorRead, ServiceRead
from api.services.dashboard import get_dashboard, get_service, get_services

router = APIRouter(prefix="/services", tags=["services"])
DatabaseSession = Annotated[Session, Depends(get_session)]


@router.get("", response_model=list[ServiceRead])
def services_index(session: DatabaseSession) -> list[ServiceRead]:
    return get_services(session)


@router.get(
    "/{service_id}/dashboard",
    response_model=DashboardRead,
    responses={404: {"model": ErrorRead}},
)
async def service_dashboard(
    service_id: str,
    session: DatabaseSession,
) -> DashboardRead | JSONResponse:
    service = get_service(session, service_id)
    if service is None:
        return JSONResponse(status_code=404, content={"error": "Service not found"})

    await asyncio.sleep(service.delay_ms / 1000)
    return get_dashboard(session, service)
