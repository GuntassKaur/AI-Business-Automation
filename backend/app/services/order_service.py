from sqlalchemy.orm import Session
from app.repositories.order_repository import create_order, delete_order, list_orders, update_order
from app.schemas.schemas import OrderCreate, OrderUpdate


def create_user_order(db: Session, payload: OrderCreate, user_id: int):
    return create_order(db, payload, user_id)


def list_user_orders(db: Session, user_id: int, skip: int = 0, limit: int = 25):
    return list_orders(db, user_id=user_id, skip=skip, limit=limit)


def update_user_order(db: Session, order_id: int, user_id: int, payload: OrderUpdate):
    return update_order(db, order_id=order_id, user_id=user_id, payload=payload)


def delete_user_order(db: Session, order_id: int, user_id: int):
    return delete_order(db, order_id=order_id, user_id=user_id)
