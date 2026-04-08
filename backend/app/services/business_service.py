import json
from sqlalchemy.orm import Session
from app.models.entities import User, Order, Invoice, ChatLog
from app.schemas.schemas import UserCreate, OrderCreate, OrderUpdate
from app.core.security import hash_password, verify_password


def create_user(db: Session, payload: UserCreate):
    user = User(email=payload.email, full_name=payload.full_name, hashed_password=hash_password(payload.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    return user if verify_password(password, user.hashed_password) else None


def create_order(db: Session, payload: OrderCreate, user_id: int | None = None):
    order = Order(**payload.model_dump(), created_by=user_id)
    db.add(order)
    db.commit()
    db.refresh(order)
    return order


def list_orders(db: Session):
    return db.query(Order).order_by(Order.created_at.desc()).all()


def update_order(db: Session, order_id: int, payload: OrderUpdate):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        return None
    for key, value in payload.model_dump(exclude_none=True).items():
        setattr(order, key, value)
    db.commit()
    db.refresh(order)
    return order


def process_invoice(file_name: str):
    extracted = {
        "file_name": file_name,
        "vendor": "Nova Supplies Ltd",
        "total": 4820.45,
        "tax": 482.05,
        "confidence": 0.96,
        "extracted_items": [
            {"description": "Automation Integrations", "quantity": 2, "price": 1200.0},
            {"description": "Cloud Workflow Credits", "quantity": 1, "price": 2420.45},
        ],
    }
    return extracted


def save_invoice(db: Session, payload: dict):
    invoice = Invoice(
        file_name=payload["file_name"],
        vendor=payload["vendor"],
        total=payload["total"],
        tax=payload["tax"],
        extracted_json=json.dumps(payload["extracted_items"]),
    )
    db.add(invoice)
    db.commit()
    return invoice


def smart_ai_reply(prompt: str):
    normalized = prompt.lower()
    if "order" in normalized:
        return "Your order pipeline looks healthy. Consider auto-escalating delayed orders after 12 hours.", "Enable delay trigger automation for Tier-1 accounts."
    if "invoice" in normalized:
        return "Invoice anomaly risk is medium. Missing line-item tags on 2 uploads.", "Run invoice schema validation before ERP sync."
    return "I can optimize workflows, summarize trends, and suggest automations from your live data.", "Connect CRM events to trigger real-time AI playbooks."


def save_chat(db: Session, user_id: int | None, prompt: str, response: str):
    log = ChatLog(user_id=user_id, prompt=prompt, response=response)
    db.add(log)
    db.commit()
