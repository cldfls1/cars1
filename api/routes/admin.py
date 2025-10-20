from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from pydantic import BaseModel
from typing import Optional

from database import get_db
from models.user import User
from models.product import Product
from models.category import Category
from models.deal import Deal, DealStatus
from routes.users import get_current_user

router = APIRouter()

async def require_admin(current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return current_user

# Category Management

class CreateCategoryRequest(BaseModel):
    name_ru: str
    name_en: str
    description_ru: Optional[str] = None
    description_en: Optional[str] = None
    icon: Optional[str] = None

@router.post("/categories")
async def create_category(
    request: CreateCategoryRequest,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    category = Category(**request.dict())
    db.add(category)
    await db.commit()
    await db.refresh(category)
    return category.to_dict()

@router.put("/categories/{category_id}")
async def update_category(
    category_id: int,
    request: CreateCategoryRequest,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Category).where(Category.id == category_id))
    category = result.scalar_one_or_none()
    
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    
    for key, value in request.dict().items():
        setattr(category, key, value)
    
    await db.commit()
    await db.refresh(category)
    return category.to_dict()

@router.delete("/categories/{category_id}")
async def delete_category(
    category_id: int,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Category).where(Category.id == category_id))
    category = result.scalar_one_or_none()
    
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    
    await db.delete(category)
    await db.commit()
    return {"message": "Category deleted"}

# Product Management

class CreateProductRequest(BaseModel):
    category_id: int
    title_ru: str
    title_en: str
    description_ru: str
    description_en: str
    price: float
    currency: str = "RUB"
    image_url: Optional[str] = None
    download_link: Optional[str] = None
    stock_quantity: int = 999

@router.post("/products")
async def create_product(
    request: CreateProductRequest,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    product = Product(**request.dict())
    db.add(product)
    await db.commit()
    await db.refresh(product)
    return product.to_dict()

@router.put("/products/{product_id}")
async def update_product(
    product_id: int,
    request: CreateProductRequest,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Product).where(Product.id == product_id))
    product = result.scalar_one_or_none()
    
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    
    for key, value in request.dict().items():
        setattr(product, key, value)
    
    await db.commit()
    await db.refresh(product)
    return product.to_dict()

@router.delete("/products/{product_id}")
async def delete_product(
    product_id: int,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Product).where(Product.id == product_id))
    product = result.scalar_one_or_none()
    
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    
    product.is_active = False
    await db.commit()
    return {"message": "Product deactivated"}

# User Management

@router.get("/users")
async def get_all_users(
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(User))
    users = result.scalars().all()
    return [user.to_dict() for user in users]

@router.put("/users/{user_id}/ban")
async def ban_user(
    user_id: int,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    if user.is_admin:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cannot ban admin")
    
    user.is_banned = True
    user.is_online = False
    
    # Cancel all active deals for this user
    deals_result = await db.execute(
        select(Deal).where(
            Deal.buyer_id == user_id,
            Deal.status.in_([DealStatus.PENDING, DealStatus.ACCEPTED, DealStatus.PAYMENT_SENT])
        )
    )
    active_deals = deals_result.scalars().all()
    for deal in active_deals:
        deal.status = DealStatus.CANCELLED
    
    await db.commit()
    return {"message": f"User {user.username} has been banned"}

@router.put("/users/{user_id}/unban")
async def unban_user(
    user_id: int,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    user.is_banned = False
    await db.commit()
    return {"message": f"User {user.username} has been unbanned"}

# Statistics

@router.get("/stats")
async def get_statistics(
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    # Count users
    users_count = await db.execute(select(func.count(User.id)))
    total_users = users_count.scalar()
    
    # Count products
    products_count = await db.execute(select(func.count(Product.id)))
    total_products = products_count.scalar()
    
    # Count deals by status
    deals_result = await db.execute(select(Deal.status, func.count(Deal.id)).group_by(Deal.status))
    deals_by_status = {status.value: count for status, count in deals_result}
    
    # Calculate total revenue (completed deals)
    completed_deals = await db.execute(
        select(Deal).where(Deal.status == DealStatus.COMPLETED)
    )
    revenue = 0
    for deal in completed_deals.scalars():
        product_result = await db.execute(select(Product).where(Product.id == deal.product_id))
        product = product_result.scalar_one_or_none()
        if product:
            revenue += product.price
    
    return {
        "total_users": total_users,
        "total_products": total_products,
        "deals_by_status": deals_by_status,
        "total_revenue": revenue,
        "completed_deals": deals_by_status.get("completed", 0)
    }
