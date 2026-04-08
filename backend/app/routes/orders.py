from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.core.deps import get_current_user
from app.db.session import get_db
from app.models.entities import User
from app.schemas.schemas import OrderCreate, OrderOut, OrderUpdate
from app.services.order_service import create_user_order, delete_user_order, list_user_orders, update_user_order

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.get("/", response_model=list[OrderOut])
def get_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=25, ge=1, le=100),
):
    return list_user_orders(db, current_user.id, skip=skip, limit=limit)


@router.post("/", response_model=OrderOut)
def post_order(payload: OrderCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return create_user_order(db, payload, user_id=current_user.id)


@router.put("/{order_id}", response_model=OrderOut)
def put_order(order_id: int, payload: OrderUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    order = update_user_order(db, order_id, current_user.id, payload)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.delete("/{order_id}")
def remove_order(order_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    deleted = delete_user_order(db, order_id, current_user.id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"message": "Order deleted"}
