from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.financial_data import FinancialData
from app.services.finance_analysis import FinanceAnalyzer
import pandas as pd

router = APIRouter()

@router.get("/")
def credit_risk(
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    records = db.query(FinancialData).filter(
        FinancialData.user_id == int(user_id)
    ).all()

    if not records:
        return {"detail": "No financial data available"}

    df = pd.DataFrame(
        [{k: v for k, v in r.__dict__.items() if not k.startswith("_")} for r in records]
    )

    metrics = FinanceAnalyzer.calculate_metrics(df)

    risk = "Low"
    if metrics["debt_to_revenue"] > 0.6:
        risk = "High"
    elif metrics["debt_to_revenue"] > 0.3:
        risk = "Medium"

    return {
        "credit_risk": risk,
        "debt_to_revenue": metrics["debt_to_revenue"]
    }
