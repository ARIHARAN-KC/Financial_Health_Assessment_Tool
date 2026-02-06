from typing import Dict

class WorkingCapitalAdvisor:
    @staticmethod
    def suggest(metrics: Dict[str, float]) -> Dict[str, str]:
        suggestions = {}

        if metrics["working_capital"] < 0:
            suggestions["liquidity"] = (
                "Working capital is negative. Focus on faster collections "
                "and negotiate longer payment terms with suppliers."
            )

        if metrics["debt_to_revenue"] > 0.5:
            suggestions["debt"] = (
                "High debt burden detected. Avoid new loans and prioritize "
                "repayment of high-interest credit."
            )

        if metrics["profit_margin"] < 0.1:
            suggestions["margin"] = (
                "Low profit margin. Review operating expenses and supplier contracts."
            )

        return suggestions
