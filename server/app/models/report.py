from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, JSON
from sqlalchemy.sql import func

from app.core.database import Base


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    report_type = Column(String, nullable=False)  
    # financial_health | creditworthiness | investor | compliance

    summary = Column(String, nullable=True)
    metrics = Column(JSON, nullable=False)     # ratios, scores, KPIs
    ai_insights = Column(JSON, nullable=True)  # recommendations

    created_at = Column(DateTime(timezone=True), server_default=func.now())
