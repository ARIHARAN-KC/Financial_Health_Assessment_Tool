from fastapi import APIRouter

router = APIRouter()


@router.get("/transactions")
def mock_transactions():
    return {
        "transactions": [
            {"date": "2024-01-01", "amount": 50000, "type": "credit"},
            {"date": "2024-01-05", "amount": 20000, "type": "debit"},
        ]
    }
