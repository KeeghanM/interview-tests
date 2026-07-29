from typing import Literal

from pydantic import BaseModel, ConfigDict

IncidentSeverity = Literal["low", "medium", "high"]
IncidentStatus = Literal["open", "resolved"]
HighestSeverity = Literal["none", "low", "medium", "high"]


class ServiceRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    owner: str


class IncidentRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    service_id: str
    owner: str
    title: str
    severity: IncidentSeverity
    status: IncidentStatus
    opened_at: str


class DashboardSummary(BaseModel):
    total_incidents: int
    active_incidents: int
    highest_severity: HighestSeverity


class DashboardRead(BaseModel):
    service: ServiceRead
    summary: DashboardSummary
    incidents: list[IncidentRead]


class ErrorRead(BaseModel):
    error: str
