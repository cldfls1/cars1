from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from typing import Optional

from database import get_db
from models.user import User
from services.auth_service import verify_password, get_password_hash, create_access_token

router = APIRouter()

class RegisterRequest(BaseModel):
    username: str
    password: str
    email: Optional[str] = None
    telegram_id: Optional[str] = None

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict

@router.post("/register", response_model=TokenResponse)
async def register(request: RegisterRequest, db: AsyncSession = Depends(get_db)):
    # Check if username already exists
    result = await db.execute(select(User).where(User.username == request.username))
    existing_user = result.scalar_one_or_none()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(request.password)
    new_user = User(
        username=request.username,
        password_hash=hashed_password,
        email=request.email,
        telegram_id=request.telegram_id,
        is_admin=False
    )
    
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    
    # Create access token
    access_token = create_access_token(data={"sub": str(new_user.id), "username": new_user.username})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": new_user.to_dict()
    }

@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    # Find user
    result = await db.execute(select(User).where(User.username == request.username))
    user = result.scalar_one_or_none()
    
    if not user or not verify_password(request.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    if user.is_banned:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your account has been banned"
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": str(user.id), "username": user.username})
    
    # Update online status
    user.is_online = True
    await db.commit()
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user.to_dict()
    }
