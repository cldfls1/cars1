from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from typing import Optional

from database import get_db
from models.user import User
from services.auth_service import decode_access_token

router = APIRouter()

async def get_current_user(authorization: str = Header(None), db: AsyncSession = Depends(get_db)) -> User:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    
    token = authorization.split(" ")[1]
    payload = decode_access_token(token)
    
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    
    user_id = payload.get("sub")
    result = await db.execute(select(User).where(User.id == int(user_id)))
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    
    if user.is_banned:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account is banned")
    
    return user

class UpdateProfileRequest(BaseModel):
    email: Optional[str] = None
    telegram_id: Optional[str] = None
    notify_email: Optional[bool] = None
    notify_telegram: Optional[bool] = None
    notify_push: Optional[bool] = None

@router.get("/me")
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return current_user.to_dict()

@router.put("/me")
async def update_profile(
    request: UpdateProfileRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if request.email is not None:
        current_user.email = request.email
    if request.telegram_id is not None:
        current_user.telegram_id = request.telegram_id
    if request.notify_email is not None:
        current_user.notify_email = request.notify_email
    if request.notify_telegram is not None:
        current_user.notify_telegram = request.notify_telegram
    if request.notify_push is not None:
        current_user.notify_push = request.notify_push
    
    await db.commit()
    await db.refresh(current_user)
    
    return current_user.to_dict()

@router.get("/online")
async def get_online_users(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.is_online == True))
    users = result.scalars().all()
    return [{"id": u.id, "username": u.username} for u in users]
