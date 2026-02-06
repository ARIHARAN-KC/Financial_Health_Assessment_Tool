from typing import Dict

class ComplianceEngine:
    @staticmethod
    def assess_tax_compliance(
        revenue: float,
        tax_paid: float
    ) -> Dict[str, str]:

        expected_tax = revenue * 0.18  # GST baseline (simplified)

        if tax_paid >= expected_tax * 0.9:
            return {
                "status": "Compliant",
                "risk": "Low",
                "note": "Tax payments align with reported revenue"
            }

        if tax_paid >= expected_tax * 0.7:
            return {
                "status": "Partially Compliant",
                "risk": "Medium",
                "note": "Possible under-reporting of GST"
            }

        return {
            "status": "Non-Compliant",
            "risk": "High",
            "note": "Significant mismatch between revenue and GST paid"
        }
