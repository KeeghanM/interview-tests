from collections.abc import Sequence

from sqlalchemy import desc, select
from sqlalchemy.orm import Session

from api.models import Incident, Service


def list_services(session: Session) -> Sequence[Service]:
    return session.scalars(select(Service).order_by(Service.display_order)).all()


def find_service(session: Session, service_id: str) -> Service | None:
    return session.get(Service, service_id)


def list_incidents_for_owner(session: Session, owner: str) -> Sequence[Incident]:
    statement = select(Incident).where(Incident.owner == owner).order_by(desc(Incident.opened_at))
    return session.scalars(statement).all()
