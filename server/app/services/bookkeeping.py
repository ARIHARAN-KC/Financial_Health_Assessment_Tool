import pandas as pd
from typing import Dict, List

EXPENSE_RULES = {
    "rent": ["rent", "lease"],
    "salary": ["salary", "wages", "payroll"],
    "utilities": ["electricity", "water", "internet", "phone"],
    "marketing": ["ads", "marketing", "promotion"],
    "logistics": ["shipping", "courier", "transport"],
    "office": ["stationery", "supplies"],
}

class BookkeepingService:
    @staticmethod
    def categorize_expenses(df: pd.DataFrame) -> pd.DataFrame:
        if "description" not in df.columns:
            df["expense_category"] = "uncategorized"
            return df

        def classify(desc: str) -> str:
            desc = str(desc).lower()
            for category, keywords in EXPENSE_RULES.items():
                if any(k in desc for k in keywords):
                    return category
            return "other"

        df["expense_category"] = df["description"].apply(classify)
        return df

    @staticmethod
    def detect_duplicates(df: pd.DataFrame) -> List[int]:
        duplicates = df.duplicated(
            subset=["record_date", "revenue", "expenses"],
            keep="first"
        )
        return df[duplicates].index.tolist()

    @staticmethod
    def reconcile_bank_books(
        bank_df: pd.DataFrame,
        books_df: pd.DataFrame
    ) -> Dict[str, int]:
        matched = bank_df.merge(
            books_df,
            on=["record_date", "amount"],
            how="inner"
        )
        return {
            "bank_transactions": len(bank_df),
            "book_entries": len(books_df),
            "matched": len(matched),
            "unmatched_bank": len(bank_df) - len(matched),
            "unmatched_books": len(books_df) - len(matched),
        }
