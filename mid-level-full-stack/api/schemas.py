from datetime import date
from typing import Literal

from pydantic import BaseModel

ExpenseStatus = Literal["Pending", "Approved", "Rejected"]


class ExpenseRead(BaseModel):
    id: int
    merchant: str
    description: str
    amount: float
    date: date
    status: ExpenseStatus
    employee: str
    employee_initials: str
    category: str


class DashboardTotals(BaseModel):
    claimed: float
    pending: float
    approved: float
    rejected: float


class DashboardRead(BaseModel):
    totals: DashboardTotals
    pending_count: int
    recent_expenses: list[ExpenseRead]
