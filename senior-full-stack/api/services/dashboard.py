from sqlalchemy.orm import Session

from api.models import Service
from api.repositories.services import (
    find_service,
    list_incidents_for_owner,
    list_services,
)
from api.schemas import (
    DashboardRead,
    DashboardSummary,
    HighestSeverity,
    IncidentRead,
    ServiceRead,
)

SEVERITY_RANK: dict[HighestSeverity, int] = {
    "none": 0,
    "low": 1,
    "medium": 2,
    "high": 3,
}


def get_services(session: Session) -> list[ServiceRead]:
    return [ServiceRead.model_validate(service) for service in list_services(session)]


def get_service(session: Session, service_id: str) -> Service | None:
    return find_service(session, service_id)


def get_dashboard(session: Session, service: Service) -> DashboardRead:
    incidents = list_incidents_for_owner(session, service.owner)
    highest_severity: HighestSeverity = max(
        (incident.severity for incident in incidents),
        key=lambda severity: SEVERITY_RANK[severity],
        default="none",
    )

    return DashboardRead(
        service=ServiceRead.model_validate(service),
        summary=DashboardSummary(
            total_incidents=len(incidents),
            active_incidents=sum(incident.status == "open" for incident in incidents),
            highest_severity=highest_severity,
        ),
        incidents=[IncidentRead.model_validate(incident) for incident in incidents],
    )
