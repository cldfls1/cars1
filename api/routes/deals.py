from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

from database import get_db
from models.deal import Deal, DealMessage, DealStatus
from models.product import Product
from models.user import User
from models.notification import Notification
from routes.users import get_current_user
from services.websocket_manager import manager
from services.notification_service import notify_user

router = APIRouter()

class CreateDealRequest(BaseModel):
    product_id: int

class UpdateDealStatusRequest(BaseModel):
    status: str
    steam_card_code: Optional[str] = None

class SendMessageRequest(BaseModel):
    message: str

@router.post("/")
async def create_deal(
    request: CreateDealRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Check if product exists
    result = await db.execute(select(Product).where(Product.id == request.product_id))
    product = result.scalar_one_or_none()
    
    if not product or not product.is_active:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    
    # Create deal
    deal = Deal(
        buyer_id=current_user.id,
        product_id=request.product_id,
        status=DealStatus.PENDING
    )
    
    db.add(deal)
    await db.commit()
    await db.refresh(deal)
    
    # Create system message
    system_msg = DealMessage(
        deal_id=deal.id,
        sender_id=current_user.id,
        message=f"Deal created for {product.title_ru}",
        is_system=1
    )
    db.add(system_msg)
    
    # Notify admin (seller)
    admin_result = await db.execute(select(User).where(User.is_admin == True))
    admin = admin_result.scalar_one_or_none()
    
    if admin:
        notification = Notification(
            user_id=admin.id,
            title="New Deal Request",
            message=f"{current_user.username} wants to buy {product.title_ru}",
            type="deal_request",
            deal_id=deal.id
        )
        db.add(notification)
        await db.commit()
        
        # Send real-time notification
        await manager.send_personal_message({
            "type": "new_deal",
            "deal_id": deal.id,
            "buyer": current_user.username,
            "product": product.title_ru
        }, admin.id)
        
        # Send multi-channel notification
        await notify_user(
            admin,
            "New Deal Request",
            f"{current_user.username} wants to buy {product.title_ru}",
            "deal_request",
            deal.id
        )
    
    return deal.to_dict()

@router.get("/")
async def get_deals(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if current_user.is_admin:
        # Admin sees all deals
        result = await db.execute(select(Deal))
    else:
        # Users see only their deals
        result = await db.execute(select(Deal).where(Deal.buyer_id == current_user.id))
    
    deals = result.scalars().all()
    return [deal.to_dict() for deal in deals]

@router.get("/{deal_id}")
async def get_deal(
    deal_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Deal).where(Deal.id == deal_id))
    deal = result.scalar_one_or_none()
    
    if not deal:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Deal not found")
    
    # Check permissions
    if not current_user.is_admin and deal.buyer_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
    
    # Get product info
    product_result = await db.execute(select(Product).where(Product.id == deal.product_id))
    product = product_result.scalar_one_or_none()
    
    # Get buyer info
    buyer_result = await db.execute(select(User).where(User.id == deal.buyer_id))
    buyer = buyer_result.scalar_one_or_none()
    
    deal_dict = deal.to_dict()
    deal_dict["product"] = product.to_dict() if product else None
    deal_dict["buyer"] = {"id": buyer.id, "username": buyer.username} if buyer else None
    
    return deal_dict

@router.put("/{deal_id}/status")
async def update_deal_status(
    deal_id: int,
    request: UpdateDealStatusRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Deal).where(Deal.id == deal_id))
    deal = result.scalar_one_or_none()
    
    if not deal:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Deal not found")
    
    # Permission check
    if current_user.is_admin:
        # Admin can change status to accepted, rejected, completed
        allowed_statuses = ["accepted", "rejected", "completed"]
    elif deal.buyer_id == current_user.id:
        # Buyer can send payment or cancel
        allowed_statuses = ["payment_sent", "cancelled"]
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
    
    if request.status not in allowed_statuses:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid status")
    
    deal.status = DealStatus[request.status.upper()]
    
    if request.steam_card_code:
        deal.steam_card_code = request.steam_card_code
    
    if request.status == "completed":
        deal.completed_at = datetime.utcnow()
    
    # Create system message
    system_msg = DealMessage(
        deal_id=deal.id,
        sender_id=current_user.id,
        message=f"Deal status updated to {request.status}",
        is_system=1
    )
    db.add(system_msg)
    
    # Get the other party
    if current_user.is_admin:
        other_user_id = deal.buyer_id
    else:
        admin_result = await db.execute(select(User).where(User.is_admin == True))
        admin = admin_result.scalar_one_or_none()
        other_user_id = admin.id if admin else None
    
    if other_user_id:
        # Create notification
        notification = Notification(
            user_id=other_user_id,
            title="Deal Status Updated",
            message=f"Deal #{deal.id} status: {request.status}",
            type="deal_update",
            deal_id=deal.id
        )
        db.add(notification)
        
        # Send real-time notification
        await manager.send_personal_message({
            "type": "deal_update",
            "deal_id": deal.id,
            "status": request.status
        }, other_user_id)
        
        # Get user for multi-channel notification
        user_result = await db.execute(select(User).where(User.id == other_user_id))
        user = user_result.scalar_one_or_none()
        if user:
            await notify_user(
                user,
                "Deal Status Updated",
                f"Deal #{deal.id} status changed to {request.status}",
                "deal_update",
                deal.id
            )
    
    await db.commit()
    await db.refresh(deal)
    
    return deal.to_dict()

@router.get("/{deal_id}/messages")
async def get_deal_messages(
    deal_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Check deal access
    deal_result = await db.execute(select(Deal).where(Deal.id == deal_id))
    deal = deal_result.scalar_one_or_none()
    
    if not deal:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Deal not found")
    
    if not current_user.is_admin and deal.buyer_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
    
    # Get messages
    result = await db.execute(
        select(DealMessage)
        .where(DealMessage.deal_id == deal_id)
        .order_by(DealMessage.created_at)
    )
    messages = result.scalars().all()
    
    return [msg.to_dict() for msg in messages]

@router.post("/{deal_id}/messages")
async def send_message(
    deal_id: int,
    request: SendMessageRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Check deal access
    deal_result = await db.execute(select(Deal).where(Deal.id == deal_id))
    deal = deal_result.scalar_one_or_none()
    
    if not deal:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Deal not found")
    
    if not current_user.is_admin and deal.buyer_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
    
    # Create message
    message = DealMessage(
        deal_id=deal_id,
        sender_id=current_user.id,
        message=request.message,
        is_system=0
    )
    
    db.add(message)
    await db.commit()
    await db.refresh(message)
    
    # Notify the other party
    if current_user.is_admin:
        other_user_id = deal.buyer_id
    else:
        admin_result = await db.execute(select(User).where(User.is_admin == True))
        admin = admin_result.scalar_one_or_none()
        other_user_id = admin.id if admin else None
    
    if other_user_id:
        await manager.send_personal_message({
            "type": "new_message",
            "deal_id": deal_id,
            "message": message.to_dict()
        }, other_user_id)
    
    return message.to_dict()
