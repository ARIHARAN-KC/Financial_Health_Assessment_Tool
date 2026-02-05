from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class FinancialData(Base):
    __tablename__ = "financial_data"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    record_date = Column(Date, nullable=False)

    revenue = Column(Float, default=0.0)
    expenses = Column(Float, default=0.0)
    profit = Column(Float, default=0.0)

    accounts_receivable = Column(Float, default=0.0)
    accounts_payable = Column(Float, default=0.0)
    inventory_value = Column(Float, nullable=True)

    loan_obligations = Column(Float, default=0.0)
    tax_paid = Column(Float, default=0.0)

    source = Column(String, default="upload")  # upload | banking | gst

    user = relationship("User", backref="financial_records")
