from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session
from app.core.deps import get_current_user
from app.db.session import get_db
from app.models.entities import User
from app.schemas.schemas import InvoiceResponse
from app.services.ai_service import process_invoice, save_invoice_result

router = APIRouter(prefix="/invoice", tags=["Invoice AI"])


@router.post("/process", response_model=InvoiceResponse)
async def process(file: UploadFile = File(...), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = process_invoice(file.filename)
    save_invoice_result(db, result)
    return result
