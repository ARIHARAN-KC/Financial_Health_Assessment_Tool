from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user_id
from app.services.file_parser import FileParser
from app.models.financial_data import FinancialData

router = APIRouter()


@router.post("/")
async def upload_file(
    file: UploadFile = File(...),
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    contents = await file.read()

    try:
        df = FileParser.parse_file(contents, file.filename)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid file format")

    # Normalize columns
    df.columns = (
        df.columns
          .astype(str)
          .str.strip()
          .str.lower()
          .str.replace(" ", "_")
    )

    if "record_date" not in df.columns:
        raise HTTPException(
            status_code=400,
            detail="record_date column is required"
        )

    for _, row in df.iterrows():
        record = FinancialData(
            user_id=int(user_id),
            record_date=row.get("record_date"),
            revenue=row.get("revenue", 0),
            expenses=row.get("expenses", 0),
            profit=row.get("profit", 0),
            accounts_receivable=row.get("accounts_receivable", 0),
            accounts_payable=row.get("accounts_payable", 0),
            inventory_value=row.get("inventory_value"),
            loan_obligations=row.get("loan_obligations", 0),
            tax_paid=row.get("tax_paid", 0),
            source="upload",
        )
        db.add(record)

    db.commit()
    return {"status": "Upload successful"}
