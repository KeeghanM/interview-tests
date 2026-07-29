from datetime import datetime
from typing import Literal

from pydantic import BaseModel


class HealthOut(BaseModel):
    status: Literal["ok"]


class OrderOut(BaseModel):
    id: int
    customer_name: str
    status: str
    total_pence: int


class TimelineOrderOut(BaseModel):
    id: int
    customer_id: int
    status: str


class TimelineEventOut(BaseModel):
    type: str
    message: str
    created_at: datetime


class TimelineOut(BaseModel):
    order: TimelineOrderOut
    timeline: list[TimelineEventOut]
