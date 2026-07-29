from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import repository
from .database import Base, SessionLocal, engine, get_db
from .schemas import CategoryOut, EmployeeOut, ExpenseOut, ExpenseUpdate, HealthOut
from .seed import seed_database


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed_database(db)
    yield


app = FastAPI(title="Finance Expenses API", lifespan=lifespan)
DatabaseSession = Annotated[Session, Depends(get_db)]


@app.get("/health", response_model=HealthOut)
def health() -> HealthOut:
    return HealthOut(status="ok")


@app.get("/expenses", response_model=list[ExpenseOut])
def get_expenses(db: DatabaseSession, status: str | None = None) -> list[ExpenseOut]:
    return [ExpenseOut.model_validate(expense) for expense in repository.list_expenses(db, status)]


@app.get("/employees", response_model=list[EmployeeOut])
def get_employees(db: DatabaseSession) -> list[EmployeeOut]:
    return [EmployeeOut.model_validate(employee) for employee in repository.list_employees(db)]


@app.get("/categories", response_model=list[CategoryOut])
def get_categories(db: DatabaseSession) -> list[CategoryOut]:
    return [CategoryOut.model_validate(category) for category in repository.list_categories(db)]


@app.put("/expenses/{expense_id}", response_model=ExpenseOut)
def put_expense(expense_id: int, payload: ExpenseUpdate, db: DatabaseSession) -> ExpenseOut:
    expense = repository.update_expense_status(db, expense_id, payload.status)
    if expense is None:
        raise HTTPException(status_code=404, detail="Expense not found")
    return ExpenseOut.model_validate(expense)
