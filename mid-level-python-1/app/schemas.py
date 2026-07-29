from typing import Literal

from pydantic import BaseModel, ConfigDict


class HealthOut(BaseModel):
    status: Literal["ok"]


class EmployeeOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str
    role: str


class CategoryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    active: int


class ExpenseOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    employee_id: int
    amount: float
    category: str
    description: str
    date: str
    status: str
    receipt: str | None = None


class ExpenseUpdate(BaseModel):
    status: str
