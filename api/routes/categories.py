from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel

from database import get_db
from models.category import Category

router = APIRouter()

class CategoryResponse(BaseModel):
    id: int
    name: str
    description: str
    icon: str | None
    created_at: str

@router.get("/")
async def get_categories(
    lang: str = Query("ru", regex="^(ru|en)$"),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Category))
    categories = result.scalars().all()
    return [cat.to_dict(lang) for cat in categories]

@router.get("/{category_id}")
async def get_category(
    category_id: int,
    lang: str = Query("ru", regex="^(ru|en)$"),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Category).where(Category.id == category_id))
    category = result.scalar_one_or_none()
    
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    
    return category.to_dict(lang)
