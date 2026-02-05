from fastapi import APIRouter

router = APIRouter()


@router.get("/returns")
def mock_gst_returns():
    return {
        "gst_returns": {
            "total_tax_paid": 15000,
            "filing_status": "Filed",
        }
    }
