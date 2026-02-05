import pandas as pd
from typing import Dict
from app.utils.helpers import safe_divide


class FinanceAnalyzer:
    @staticmethod
    def calculate_metrics(df: pd.DataFrame) -> Dict[str, float]:

        if df.empty:
            return {
                "total_revenue": 0,
                "total_expenses": 0,
                "profit": 0,
                "profit_margin": 0,
                "working_capital": 0,
                "debt_to_revenue": 0,
            }

        # Normalize column names
        df = df.copy()
        df.columns = (
            df.columns
              .astype(str)
              .str.strip()
              .str.lower()
        )

        revenue = df.get("revenue", pd.Series(dtype=float)).sum()
        expenses = df.get("expenses", pd.Series(dtype=float)).sum()
        profit = revenue - expenses

        ar = df.get("accounts_receivable", pd.Series(dtype=float)).sum()
        ap = df.get("accounts_payable", pd.Series(dtype=float)).sum()
        inventory = df.get("inventory_value", pd.Series(dtype=float)).sum()
        loans = df.get("loan_obligations", pd.Series(dtype=float)).sum()

        return {
            "total_revenue": round(revenue, 2),
            "total_expenses": round(expenses, 2),
            "profit": round(profit, 2),
            "profit_margin": safe_divide(profit, revenue),
            "working_capital": round(ar + inventory - ap, 2),
            "debt_to_revenue": safe_divide(loans, revenue),
        }
