from pydantic import BaseModel
from datetime import date
from typing import Optional


class FinancialDataBase(BaseModel):
    record_date: date
    revenue: float
    expenses: float
    profit: float

    accounts_receivable: float
    accounts_payable: float
    inventory_value: Optional[float] = None

    loan_obligations: float
    tax_paid: float
    source: str


class FinancialDataCreate(FinancialDataBase):
    pass


class FinancialDataResponse(FinancialDataBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
