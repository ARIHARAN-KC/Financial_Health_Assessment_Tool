from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import pandas as pd

from app.core.database import get_db
from app.core.security import get_current_user_id
from app.ai.claude_client import claude_client
from app.ai.prompts import SYSTEM_FINANCIAL_ANALYST, financial_health_prompt
from app.ai.multilingual import apply_language
from app.services.finance_analysis import FinanceAnalyzer
from app.models.financial_data import FinancialData

router = APIRouter()


@router.post("/financial-health")
async def ai_financial_health(
    language: str = "en",
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    records = db.query(FinancialData).filter(
        FinancialData.user_id == int(user_id)
    ).all()

    if not records:
        return {
            "insights": "No financial data found. Please upload financial records first."
        }

    df = pd.DataFrame(
        [
            {k: v for k, v in r.__dict__.items() if not k.startswith("_")}
            for r in records
        ]
    )

    metrics = FinanceAnalyzer.calculate_metrics(df)

    system_prompt = apply_language(SYSTEM_FINANCIAL_ANALYST, language)
    user_prompt = financial_health_prompt(
        metrics,
        industry="SME",
        language=language,
    )

    response = await claude_client.generate(system_prompt, user_prompt)

    return {"insights": response["content"]}
