from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional

from database import get_db
from models.product import Product

router = APIRouter()

@router.get("/")
async def get_products(
    category_id: Optional[int] = None,
    lang: str = Query("ru", regex="^(ru|en)$"),
    db: AsyncSession = Depends(get_db)
):
    query = select(Product).where(Product.is_active == True)
    
    if category_id:
        query = query.where(Product.category_id == category_id)
    
    result = await db.execute(query)
    products = result.scalars().all()
    
    return [product.to_dict(lang) for product in products]

@router.get("/{product_id}")
async def get_product(
    product_id: int,
    lang: str = Query("ru", regex="^(ru|en)$"),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Product).where(Product.id == product_id))
    product = result.scalar_one_or_none()
    
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    
    if not product.is_active:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not available")
    
    return product.to_dict(lang)
