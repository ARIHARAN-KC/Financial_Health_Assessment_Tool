from pydantic import BaseModel
from typing import Dict, Any
from datetime import datetime


class ReportResponse(BaseModel):
    id: int
    report_type: str
    summary: str | None
    metrics: Dict[str, Any]
    ai_insights: Dict[str, Any] | None
    created_at: datetime

    class Config:
        from_attributes = True
