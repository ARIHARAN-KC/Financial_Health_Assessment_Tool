from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import pandas as pd

from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.financial_data import FinancialData
from app.models.report import Report
from app.services.finance_analysis import FinanceAnalyzer
from app.services.compliance_engine import ComplianceEngine

router = APIRouter()

@router.get("/")
def compliance_status(
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    records = db.query(FinancialData).filter(
        FinancialData.user_id == int(user_id)
    ).all()

    if not records:
        return {"detail": "No financial data available for compliance check"}

    df = pd.DataFrame(
        [{k: v for k, v in r.__dict__.items() if not k.startswith("_")} for r in records]
    )

    metrics = FinanceAnalyzer.calculate_metrics(df)

    total_revenue = metrics.get("total_revenue", 0)
    total_tax_paid = df.get("tax_paid", pd.Series(dtype=float)).sum()

    compliance = ComplianceEngine.assess_tax_compliance(
        revenue=total_revenue,
        tax_paid=total_tax_paid,
    )

    report = Report(
        user_id=int(user_id),
        report_type="compliance",
        summary="GST and tax compliance assessment",
        metrics={
            "total_revenue": total_revenue,
            "tax_paid": round(total_tax_paid, 2),
        },
        ai_insights=compliance,
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    return {
        "report_id": report.id,
        "gst_filing_status": compliance["status"],
        "compliance_risk": compliance["risk"],
        "notes": compliance["note"],
    }
