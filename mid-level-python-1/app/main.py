from contextlib import asynccontextmanager
from collections.abc import AsyncIterator

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import repository
from .database import Base, SessionLocal, engine, get_db
from .schemas import CategoryOut, EmployeeOut, ExpenseOut, ExpenseUpdate
from .seed import seed_database


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed_database(db)
    yield


app = FastAPI(title="Finance Expenses API", lifespan=lifespan)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/expenses", response_model=list[ExpenseOut])
def get_expenses(status: str | None = None, db: Session = Depends(get_db)):
    return repository.list_expenses(db, status)


@app.get("/employees", response_model=list[EmployeeOut])
def get_employees(db: Session = Depends(get_db)):
    return repository.list_employees(db)


@app.get("/categories", response_model=list[CategoryOut])
def get_categories(db: Session = Depends(get_db)):
    return repository.list_categories(db)


@app.put("/expenses/{expense_id}", response_model=ExpenseOut)
def put_expense(expense_id: int, payload: ExpenseUpdate, db: Session = Depends(get_db)):
    expense = repository.update_expense_status(db, expense_id, payload.status)
    if expense is None:
        raise HTTPException(status_code=404, detail="Expense not found")
    return expense
