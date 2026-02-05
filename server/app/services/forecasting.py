import pandas as pd
from typing import Dict


class ForecastingService:
    @staticmethod
    def forecast_revenue(
        df: pd.DataFrame,
        months: int = 6
    ) -> Dict[str, float]:
        """
        Linear trend forecast (safe MVP)
        """
        if "revenue" not in df.columns:
            return {}

        df = df.copy()
        df["t"] = range(len(df))

        coeffs = pd.Series(df["revenue"]).rolling(3).mean().dropna()

        if coeffs.empty:
            return {}

        last_value = coeffs.iloc[-1]

        forecast = {
            f"month_{i+1}": round(last_value * (1 + 0.02 * i), 2)
            for i in range(months)
        }

        return forecast
