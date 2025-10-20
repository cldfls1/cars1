"""
Vercel serverless function entry point with PostgreSQL database
"""
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from .database import get_db, engine, Base
from .models import User, Product, Deal, Message

app = FastAPI(
    title="CarX Mods Club API",
    description="Trading platform for game mods with PostgreSQL",
    version="3.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class LoginRequest(BaseModel):
    username: str
    password: str

class RegisterRequest(BaseModel):
    username: str
    password: str
    email: Optional[str] = None
    telegram_id: Optional[str] = None

class CreateDealRequest(BaseModel):
    product_id: int

class UpdateDealStatusRequest(BaseModel):
    status: str
    steam_card_code: Optional[str] = None

class SendMessageRequest(BaseModel):
    message: str
    sender_id: int

class ProductCreate(BaseModel):
    title: str
    description: str
    price: float
    category: str
    seller: str
    image_url: Optional[str] = None

# Note: Tables should be initialized using init_db.py
# Run: DATABASE_URL="your_neon_url" python api/init_db.py

# Routes
@app.get("/")
def root():
    return {"message": "CarX Mods Club API", "status": "running", "version": "3.0.0", "database": "PostgreSQL"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "database": "connected"}

# TEMPORARY: Init database (remove after first run)
@app.get("/api/init-database")
async def init_database(db: AsyncSession = Depends(get_db)):
    """Initialize database with tables and seed data - Open this URL in browser"""
    try:
        # Create tables
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        
        # Add seed data
        # Users
        admin = User(username="admin", email="admin@example.com", role="admin", password="admin123")
        seller = User(username="seller", email="seller@example.com", role="seller", password="seller123")
        db.add_all([admin, seller])
        await db.commit()
        
        # Products
        products = [
            Product(title="BMW M3 E46 Mod", description="High quality BMW M3 E46 mod", price=9.99, category="Cars", seller="ModMaker123", image_url="https://via.placeholder.com/300x200"),
            Product(title="Custom Sound Pack", description="Realistic engine sounds pack", price=4.99, category="Audio", seller="SoundPro", image_url="https://via.placeholder.com/300x200"),
            Product(title="Drift Map Bundle", description="5 amazing drift tracks", price=14.99, category="Maps", seller="MapMaster", image_url="https://via.placeholder.com/300x200"),
            Product(title="Racing Livery Pack", description="Professional racing liveries", price=7.99, category="Liveries", seller="DesignPro", image_url="https://via.placeholder.com/300x200"),
            Product(title="Turbo Performance Kit", description="Upgrade your car performance", price=12.99, category="Parts", seller="TuningExp", image_url="https://via.placeholder.com/300x200"),
        ]
        db.add_all(products)
        await db.commit()
        
        return {"success": True, "message": "Database initialized with 2 users and 5 products"}
    except Exception as e:
        return {"success": False, "error": str(e)}

# Auth
@app.post("/api/auth/login")
async def login(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(User).where(User.username == request.username)
    )
    user = result.scalar_one_or_none()
    
    if not user or user.password != request.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return {
        "access_token": f"token_{user.username}",
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role
        }
    }

@app.post("/api/auth/register")
async def register(request: RegisterRequest, db: AsyncSession = Depends(get_db)):
    # Check if username exists
    result = await db.execute(
        select(User).where(User.username == request.username)
    )
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Username already exists")
    
    # Create user
    new_user = User(
        username=request.username,
        password=request.password,
        email=request.email or "",
        role="user"
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    
    return {
        "message": "User registered successfully",
        "access_token": f"token_{new_user.username}",
        "user": {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email,
            "role": new_user.role
        }
    }

# Products
@app.get("/api/products")
async def get_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(Product)
    
    if category:
        query = query.where(Product.category == category)
    
    if search:
        query = query.where(
            (Product.title.ilike(f"%{search}%")) | (Product.description.ilike(f"%{search}%"))
        )
    
    result = await db.execute(query)
    products = result.scalars().all()
    
    return [
        {
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "price": p.price,
            "category": p.category,
            "seller": p.seller,
            "image_url": p.image_url,
            "created_at": p.created_at.isoformat() if p.created_at else None
        }
        for p in products
    ]

@app.get("/api/products/{product_id}")
async def get_product(product_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Product).where(Product.id == product_id)
    )
    product = result.scalar_one_or_none()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {
        "id": product.id,
        "title": product.title,
        "description": product.description,
        "price": product.price,
        "category": product.category,
        "seller": product.seller,
        "image_url": product.image_url,
        "created_at": product.created_at.isoformat() if product.created_at else None
    }

@app.post("/api/products")
async def create_product(
    title: str,
    description: str,
    price: float,
    category: str,
    seller: str,
    db: AsyncSession = Depends(get_db)
):
    new_product = Product(
        title=title,
        description=description,
        price=price,
        category=category,
        seller=seller,
        image_url="https://via.placeholder.com/300x200"
    )
    db.add(new_product)
    await db.commit()
    await db.refresh(new_product)
    
    return {
        "id": new_product.id,
        "title": new_product.title,
        "description": new_product.description,
        "price": new_product.price,
        "category": new_product.category,
        "seller": new_product.seller,
        "image_url": new_product.image_url,
        "created_at": new_product.created_at.isoformat()
    }

@app.put("/api/products/{product_id}")
async def update_product(product_id: int, request: ProductCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Product).where(Product.id == product_id)
    )
    product = result.scalar_one_or_none()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Update fields
    product.title = request.title
    product.description = request.description
    product.price = request.price
    product.category = request.category
    product.seller = request.seller
    if request.image_url:
        product.image_url = request.image_url
    
    await db.commit()
    await db.refresh(product)
    
    return {
        "id": product.id,
        "title": product.title,
        "description": product.description,
        "price": product.price,
        "category": product.category,
        "seller": product.seller,
        "image_url": product.image_url,
        "created_at": product.created_at.isoformat()
    }

@app.delete("/api/products/{product_id}")
async def delete_product(product_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Product).where(Product.id == product_id)
    )
    product = result.scalar_one_or_none()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    await db.delete(product)
    await db.commit()
    
    return {"message": "Product deleted"}

# Categories
@app.get("/api/categories")
async def get_categories():
    return ["Cars", "Audio", "Maps", "Liveries", "Parts"]

# Users
@app.get("/api/users/me")
async def get_current_user(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == 1))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"id": user.id, "username": user.username, "email": user.email, "role": user.role}

@app.get("/api/users/{user_id}")
async def get_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(User).where(User.id == user_id)
    )
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": user.role
    }

# Deals
@app.post("/api/deals")
async def create_deal(request: CreateDealRequest, db: AsyncSession = Depends(get_db)):
    # Get product
    result = await db.execute(
        select(Product).where(Product.id == request.product_id)
    )
    product = result.scalar_one_or_none()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Create deal
    new_deal = Deal(
        buyer_id=1,  # Mock user
        product_id=request.product_id,
        status="pending"
    )
    db.add(new_deal)
    await db.commit()
    await db.refresh(new_deal)
    
    return {
        "id": new_deal.id,
        "buyer_id": new_deal.buyer_id,
        "product_id": new_deal.product_id,
        "status": new_deal.status,
        "created_at": new_deal.created_at.isoformat(),
        "updated_at": new_deal.updated_at.isoformat() if new_deal.updated_at else None,
        "product": {
            "id": product.id,
            "title": product.title,
            "description": product.description,
            "price": product.price,
            "image_url": product.image_url
        }
    }

@app.get("/api/deals")
async def get_deals(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Deal))
    deals = result.scalars().all()
    
    deals_with_products = []
    for deal in deals:
        # Get product for each deal
        prod_result = await db.execute(
            select(Product).where(Product.id == deal.product_id)
        )
        product = prod_result.scalar_one_or_none()
        
        if product:
            deals_with_products.append({
                "id": deal.id,
                "buyer_id": deal.buyer_id,
                "product_id": deal.product_id,
                "status": deal.status,
                "created_at": deal.created_at.isoformat(),
                "updated_at": deal.updated_at.isoformat() if deal.updated_at else None,
                "product": {
                    "id": product.id,
                    "title": product.title,
                    "price": product.price,
                    "seller": product.seller,
                    "image_url": product.image_url
                }
            })
    
    return deals_with_products

@app.get("/api/deals/{deal_id}")
async def get_deal(deal_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Deal).where(Deal.id == deal_id)
    )
    deal = result.scalar_one_or_none()
    
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    
    # Get product
    prod_result = await db.execute(
        select(Product).where(Product.id == deal.product_id)
    )
    product = prod_result.scalar_one_or_none()
    
    # Get buyer username
    buyer_result = await db.execute(
        select(User).where(User.id == deal.buyer_id)
    )
    buyer = buyer_result.scalar_one_or_none()
    
    return {
        "id": deal.id,
        "buyer_id": deal.buyer_id,
        "buyer_username": buyer.username if buyer else "Unknown",
        "product_id": deal.product_id,
        "status": deal.status,
        "created_at": deal.created_at.isoformat(),
        "updated_at": deal.updated_at.isoformat() if deal.updated_at else None,
        "product": {
            "id": product.id,
            "title": product.title,
            "description": product.description,
            "price": product.price,
            "seller": product.seller,
            "image_url": product.image_url
        } if product else None
    }

@app.put("/api/deals/{deal_id}/status")
async def update_deal_status(
    deal_id: int,
    request: UpdateDealStatusRequest,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Deal).where(Deal.id == deal_id)
    )
    deal = result.scalar_one_or_none()
    
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    
    # Update status
    deal.status = request.status
    deal.updated_at = datetime.utcnow()
    
    if request.status == "completed":
        deal.completed_at = datetime.utcnow()
    
    # Add system message
    system_message = Message(
        deal_id=deal_id,
        sender_id=0,
        message=f"Status updated to {request.status}",
        is_system=True
    )
    db.add(system_message)
    
    await db.commit()
    await db.refresh(deal)
    
    return {
        "id": deal.id,
        "buyer_id": deal.buyer_id,
        "product_id": deal.product_id,
        "status": deal.status,
        "created_at": deal.created_at.isoformat(),
        "updated_at": deal.updated_at.isoformat() if deal.updated_at else None
    }

@app.get("/api/deals/{deal_id}/messages")
async def get_messages(deal_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Message).where(Message.deal_id == deal_id).order_by(Message.created_at)
    )
    messages = result.scalars().all()
    
    return [
        {
            "id": m.id,
            "deal_id": m.deal_id,
            "sender_id": m.sender_id,
            "message": m.message,
            "is_system": m.is_system,
            "created_at": m.created_at.isoformat()
        }
        for m in messages
    ]

@app.post("/api/deals/{deal_id}/messages")
async def send_message(
    deal_id: int,
    request: SendMessageRequest,
    db: AsyncSession = Depends(get_db)
):
    # Check deal exists
    result = await db.execute(
        select(Deal).where(Deal.id == deal_id)
    )
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Deal not found")
    
    # Create message
    new_message = Message(
        deal_id=deal_id,
        sender_id=request.sender_id,
        message=request.message,
        is_system=False
    )
    db.add(new_message)
    await db.commit()
    await db.refresh(new_message)
    
    return {
        "id": new_message.id,
        "deal_id": new_message.deal_id,
        "sender_id": new_message.sender_id,
        "message": new_message.message,
        "is_system": new_message.is_system,
        "created_at": new_message.created_at.isoformat()
    }

# Admin endpoints
@app.get("/api/admin/stats")
async def get_admin_stats(db: AsyncSession = Depends(get_db)):
    """Get admin statistics"""
    # Count users
    users_count = await db.execute(select(User))
    total_users = len(users_count.scalars().all())
    
    # Count products
    products_count = await db.execute(select(Product))
    total_products = len(products_count.scalars().all())
    
    # Count completed deals
    completed_deals_result = await db.execute(
        select(Deal).where(Deal.status == "completed")
    )
    completed_deals = len(completed_deals_result.scalars().all())
    
    # Calculate revenue (sum of completed deal products)
    total_revenue = 0.0
    deals_result = await db.execute(
        select(Deal).where(Deal.status == "completed")
    )
    for deal in deals_result.scalars():
        product_result = await db.execute(
            select(Product).where(Product.id == deal.product_id)
        )
        product = product_result.scalar_one_or_none()
        if product:
            total_revenue += product.price
    
    return {
        "total_users": total_users,
        "total_products": total_products,
        "completed_deals": completed_deals,
        "total_revenue": total_revenue
    }

@app.get("/api/admin/users")
async def get_all_users(db: AsyncSession = Depends(get_db)):
    """Get all users for admin panel"""
    result = await db.execute(select(User))
    users = result.scalars().all()
    
    return [
        {
            "id": u.id,
            "username": u.username,
            "email": u.email,
            "role": u.role,
            "is_admin": u.role == "admin",
            "is_banned": False  # Add this field to User model if needed
        }
        for u in users
    ]

# Export app for Vercel (ASGI)
