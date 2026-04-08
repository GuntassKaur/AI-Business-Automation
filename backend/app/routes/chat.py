from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.deps import get_current_user
from app.db.session import get_db
from app.models.entities import User
from app.schemas.schemas import ChatRequest, ChatResponse
from app.services.ai_service import save_chat, smart_ai_reply

router = APIRouter(prefix="/chat", tags=["AI Assistant"])


@router.post("/", response_model=ChatResponse)
def chat(payload: ChatRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    response, recommendation = smart_ai_reply(payload.prompt)
    save_chat(db, current_user.id, payload.prompt, response)
    return ChatResponse(response=response, recommendation=recommendation)
