from sqlalchemy.orm import Session
from app.models.entities import Order
from app.schemas.schemas import OrderCreate, OrderUpdate


def create_order(db: Session, payload: OrderCreate, user_id: int) -> Order:
    order = Order(**payload.model_dump(), created_by=user_id)
    db.add(order)
    db.commit()
    db.refresh(order)
    return order


def list_orders(db: Session, user_id: int, skip: int = 0, limit: int = 25):
    return (
        db.query(Order)
        .filter(Order.created_by == user_id)
        .order_by(Order.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_order_by_id(db: Session, order_id: int, user_id: int) -> Order | None:
    return db.query(Order).filter(Order.id == order_id, Order.created_by == user_id).first()


def update_order(db: Session, order_id: int, user_id: int, payload: OrderUpdate):
    order = get_order_by_id(db, order_id, user_id)
    if not order:
        return None
    for key, value in payload.model_dump(exclude_none=True).items():
        setattr(order, key, value)
    db.commit()
    db.refresh(order)
    return order


def delete_order(db: Session, order_id: int, user_id: int) -> bool:
    order = get_order_by_id(db, order_id, user_id)
    if not order:
        return False
    db.delete(order)
    db.commit()
    return True
