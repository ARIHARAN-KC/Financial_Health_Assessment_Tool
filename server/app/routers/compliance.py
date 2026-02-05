from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def compliance_status():
    return {
        "gst_filing_status": "Filed",
        "last_filed_period": "2024-Q4",
        "compliance_risk": "Low",
        "notes": "All mandatory filings are up to date"
    }
