from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import pandas as pd

from app.core.database import get_db
from app.core.security import get_current_user_id
from app.services.finance_analysis import FinanceAnalyzer
from app.services.risk_engine import RiskEngine
from app.services.benchmarking import BenchmarkingService
from app.models.financial_data import FinancialData
from app.models.user import User
from app.models.report import Report
from app.services.working_capital import WorkingCapitalAdvisor

router = APIRouter()


@router.get("/")
def analyze(
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
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
    risk = RiskEngine.assess_risk(metrics)
    credit_score = RiskEngine.credit_score(metrics)

    suggestions = WorkingCapitalAdvisor.suggest(metrics)

    user = db.query(User).get(int(user_id))
    benchmark = BenchmarkingService.compare(metrics, user.industry or "")

    report = Report(
        user_id=int(user_id),
        report_type="analysis",
        summary="Financial metrics and risk assessment",
        metrics=metrics,
        ai_insights={
            "risk": risk,
            "credit_score": credit_score,
            "benchmark": benchmark,
            "working_capital_suggestions": suggestions,
        },
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    return {
        "report_id": report.id,
        "metrics": metrics,
        "risk": risk,
        "credit_score": credit_score,
        "benchmark": benchmark,
        "working_capital_suggestions": suggestions,
    }
