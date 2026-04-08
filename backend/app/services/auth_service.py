from sqlalchemy.orm import Session
from app.core.security import create_access_token, create_refresh_token, decode_refresh_token
from app.repositories.auth_repository import (
    authenticate_user,
    create_user,
    get_user_by_email,
    get_user_by_id,
    is_refresh_token_valid,
    revoke_refresh_token,
    upsert_refresh_token,
)
from app.schemas.schemas import UserCreate


def register_user(db: Session, payload: UserCreate):
    existing = get_user_by_email(db, payload.email)
    if existing:
        return None
    return create_user(db, payload)


def login_user(db: Session, email: str, password: str):
    user = authenticate_user(db, email, password)
    if not user:
        return None
    access_token = create_access_token(str(user.id))
    refresh_token = create_refresh_token(str(user.id))
    upsert_refresh_token(db, user.id, refresh_token)
    return {"user": user, "access_token": access_token, "refresh_token": refresh_token}


def refresh_access_token(db: Session, refresh_token: str):
    user_id = decode_refresh_token(refresh_token)
    if not user_id:
        return None
    user = get_user_by_id(db, int(user_id))
    if not user:
        return None
    if not is_refresh_token_valid(db, user.id, refresh_token):
        return None

    new_access = create_access_token(str(user.id))
    new_refresh = create_refresh_token(str(user.id))
    upsert_refresh_token(db, user.id, new_refresh)
    return {"access_token": new_access, "refresh_token": new_refresh}


def logout_user(db: Session, user_id: int):
    revoke_refresh_token(db, user_id)
