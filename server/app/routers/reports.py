from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.report import Report

router = APIRouter()


@router.get("/")
def list_reports(
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    return db.query(Report).filter(Report.user_id == int(user_id)).all()
