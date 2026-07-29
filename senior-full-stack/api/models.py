from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from api.database import Base
from api.schemas import IncidentSeverity, IncidentStatus


class Service(Base):
    __tablename__ = "services"

    id: Mapped[str] = mapped_column(String(80), primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    owner: Mapped[str] = mapped_column(String(120))
    delay_ms: Mapped[int] = mapped_column(Integer)
    display_order: Mapped[int] = mapped_column(Integer)


class Incident(Base):
    __tablename__ = "incidents"

    id: Mapped[str] = mapped_column(String(20), primary_key=True)
    service_id: Mapped[str] = mapped_column(ForeignKey("services.id"))
    owner: Mapped[str] = mapped_column(String(120))
    title: Mapped[str] = mapped_column(String(200))
    severity: Mapped[IncidentSeverity] = mapped_column(String(20))
    status: Mapped[IncidentStatus] = mapped_column(String(20))
    opened_at: Mapped[str] = mapped_column(String(30))
