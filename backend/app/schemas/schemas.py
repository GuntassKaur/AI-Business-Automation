from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RefreshRequest(BaseModel):
    refresh_token: str


class UserCreate(BaseModel):
    email: EmailStr
    full_name: str = Field(min_length=2, max_length=120)
    password: str = Field(min_length=8, max_length=128)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: str

    class Config:
        from_attributes = True


class OrderCreate(BaseModel):
    title: str = Field(min_length=2, max_length=200)
    customer: str = Field(min_length=2, max_length=200)
    amount: float = Field(ge=0)
    status: str = "pending"


class OrderUpdate(BaseModel):
    title: Optional[str] = Field(default=None, min_length=2, max_length=200)
    customer: Optional[str] = Field(default=None, min_length=2, max_length=200)
    amount: Optional[float] = Field(default=None, ge=0)
    status: Optional[str] = None


class OrderOut(BaseModel):
    id: int
    title: str
    customer: str
    amount: float
    status: str

    class Config:
        from_attributes = True


class ChatRequest(BaseModel):
    prompt: str = Field(min_length=2, max_length=2500)


class ChatResponse(BaseModel):
    response: str
    recommendation: str


class InvoiceResponse(BaseModel):
    file_name: str
    vendor: str
    total: float
    tax: float
    confidence: float
    extracted_items: list[dict]
