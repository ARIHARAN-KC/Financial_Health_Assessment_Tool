from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import pandas as pd

from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.financial_data import FinancialData
from app.models.report import Report
from app.services.forecasting import ForecastingService

router = APIRouter()

@router.get("/")
def forecast(
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    records = db.query(FinancialData).filter(
        FinancialData.user_id == int(user_id)
    ).order_by(FinancialData.record_date).all()

    if len(records) < 3:
        return {"detail": "Not enough data for forecasting"}

    df = pd.DataFrame(
        [{k: v for k, v in r.__dict__.items() if not k.startswith("_")} for r in records]
    )

    forecast = ForecastingService.forecast_revenue(df)

    report = Report(
        user_id=int(user_id),
        report_type="forecast",
        summary="Revenue forecast based on historical trends",
        metrics=forecast,
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    return {
        "forecast": forecast,
        "report_id": report.id,
    }
