from pydantic import BaseModel
from typing import Dict, Any, Union
from datetime import datetime


class ReportResponse(BaseModel):
    id: int
    report_type: str
    summary: str | None
    metrics: Dict[str, Any]
    ai_insights: Union[Dict[str, Any], str, None] 
    created_at: datetime

    class Config:
        from_attributes = True
