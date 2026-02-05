from typing import Dict


class RiskEngine:
    @staticmethod
    def assess_risk(metrics: Dict[str, float]) -> Dict[str, str]:
        risk = "Low"
        reasons = []

        if metrics["profit_margin"] < 0.05:
            risk = "Medium"
            reasons.append("Low profit margin")

        if metrics["debt_to_revenue"] > 0.6:
            risk = "High"
            reasons.append("High debt exposure")

        if metrics["working_capital"] < 0:
            risk = "High"
            reasons.append("Negative working capital")

        return {
            "risk_level": risk,
            "reasons": reasons,
        }

    @staticmethod
    def credit_score(metrics: Dict[str, float]) -> int:
        score = 750

        if metrics["profit_margin"] < 0.1:
            score -= 50
        if metrics["debt_to_revenue"] > 0.5:
            score -= 100
        if metrics["working_capital"] < 0:
            score -= 100

        return max(score, 300)
