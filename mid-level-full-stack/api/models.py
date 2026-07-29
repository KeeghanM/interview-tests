from datetime import date
from decimal import Decimal

from sqlalchemy import Date, ForeignKey, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from api.database import Base
from api.schemas import ExpenseStatus


class Employee(Base):
    __tablename__ = "employees"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100))
    initials: Mapped[str] = mapped_column(String(3))
    email: Mapped[str] = mapped_column(String(255), unique=True)


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(80), unique=True)


class Expense(Base):
    __tablename__ = "expenses"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    employee_id: Mapped[int] = mapped_column(ForeignKey("employees.id"))
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"))
    merchant: Mapped[str] = mapped_column(String(120))
    description: Mapped[str] = mapped_column(String(255))
    amount: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    submitted_at: Mapped[date] = mapped_column(Date)
    status: Mapped[ExpenseStatus] = mapped_column(String(20))

    employee: Mapped[Employee] = relationship()
    category: Mapped[Category] = relationship()
