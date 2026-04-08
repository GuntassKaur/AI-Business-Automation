from sqlalchemy.orm import Session
from app.models.entities import Invoice, ChatLog


def save_invoice(db: Session, payload: dict) -> None:
    invoice = Invoice(
        file_name=payload["file_name"],
        vendor=payload["vendor"],
        total=payload["total"],
        tax=payload["tax"],
        extracted_json=str(payload["extracted_items"]),
    )
    db.add(invoice)
    db.commit()


def save_chat_log(db: Session, user_id: int, prompt: str, response: str) -> None:
    log = ChatLog(user_id=user_id, prompt=prompt, response=response)
    db.add(log)
    db.commit()
