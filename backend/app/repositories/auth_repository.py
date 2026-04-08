from sqlalchemy.orm import Session
from app.models.entities import User, RefreshToken
from app.schemas.schemas import UserCreate
from app.core.security import hash_password, verify_password


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def get_user_by_id(db: Session, user_id: int) -> User | None:
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, payload: UserCreate) -> User:
    user = User(email=payload.email, full_name=payload.full_name, role="admin", hashed_password=hash_password(payload.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, email: str, password: str) -> User | None:
    user = get_user_by_email(db, email)
    if not user:
        return None
    return user if verify_password(password, user.hashed_password) else None


def upsert_refresh_token(db: Session, user_id: int, token: str) -> None:
    existing = db.query(RefreshToken).filter(RefreshToken.user_id == user_id).first()
    if existing:
        existing.token = token
    else:
        db.add(RefreshToken(user_id=user_id, token=token))
    db.commit()


def is_refresh_token_valid(db: Session, user_id: int, token: str) -> bool:
    row = db.query(RefreshToken).filter(RefreshToken.user_id == user_id, RefreshToken.token == token).first()
    return row is not None


def revoke_refresh_token(db: Session, user_id: int) -> None:
    db.query(RefreshToken).filter(RefreshToken.user_id == user_id).delete()
    db.commit()
