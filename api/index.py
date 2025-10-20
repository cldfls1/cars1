"""
Vercel serverless function entry point
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI(
    title="CarX Mods Club API",
    description="Simple trading platform for game mods",
    version="2.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Product(BaseModel):
    id: int
    title: str
    description: str
    price: float
    category: str
    seller: str
    image_url: Optional[str] = None
    created_at: str

class User(BaseModel):
    id: int
    username: str
    email: str
    role: str = "user"

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

# ⚠️ WARNING: In-memory storage - data will be lost on Vercel serverless cold starts
# For production, use a real database (PostgreSQL, MongoDB, etc.)

# In-memory storage
products_db = [
    {
        "id": 1,
        "title": "BMW M3 E46 Mod",
        "description": "High quality BMW M3 E46 mod with custom liveries",
        "price": 9.99,
        "category": "Cars",
        "seller": "ModMaker123",
        "image_url": "https://via.placeholder.com/300x200",
        "created_at": datetime.now().isoformat()
    },
    {
        "id": 2,
        "title": "Custom Sound Pack",
        "description": "Realistic engine sounds pack",
        "price": 4.99,
        "category": "Audio",
        "seller": "SoundPro",
        "image_url": "https://via.placeholder.com/300x200",
        "created_at": datetime.now().isoformat()
    }
]

users_db = [
    {"id": 1, "username": "admin", "email": "admin@example.com", "role": "admin", "password": "admin123"},
    {"id": 2, "username": "seller", "email": "seller@example.com", "role": "seller", "password": "seller123"}
]

categories_db = ["Cars", "Audio", "Maps", "Liveries", "Parts"]

# Initialize with empty lists (will reset on cold start)
if 'deals_db' not in globals():
    deals_db = []
if 'messages_db' not in globals():
    messages_db = []

# Routes
@app.get("/")
def root():
    return {"message": "CarX Mods Club API", "status": "running", "version": "2.0.0"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

# Auth
@app.post("/api/auth/login")
def login(request: LoginRequest):
    user = next((u for u in users_db if u["username"] == request.username and u["password"] == request.password), None)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {
        "access_token": f"token_{user['username']}",
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "username": user["username"],
            "email": user["email"],
            "role": user["role"]
        }
    }

@app.post("/api/auth/register")
def register(request: RegisterRequest):
    if any(u["username"] == request.username for u in users_db):
        raise HTTPException(status_code=400, detail="Username already exists")
    
    new_user = {
        "id": len(users_db) + 1,
        "username": request.username,
        "email": request.email or "",
        "role": "user",
        "password": request.password
    }
    users_db.append(new_user)
    return {
        "message": "User registered successfully",
        "access_token": f"token_{new_user['username']}",
        "user": {
            "id": new_user["id"],
            "username": new_user["username"],
            "email": new_user["email"],
            "role": new_user["role"]
        }
    }

# Products
@app.get("/api/products", response_model=List[Product])
def get_products(category: Optional[str] = None, search: Optional[str] = None):
    result = products_db.copy()
    
    if category:
        result = [p for p in result if p["category"] == category]
    
    if search:
        result = [p for p in result if search.lower() in p["title"].lower() or search.lower() in p["description"].lower()]
    
    return result

@app.get("/api/products/{product_id}", response_model=Product)
def get_product(product_id: int):
    product = next((p for p in products_db if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.post("/api/products")
def create_product(title: str, description: str, price: float, category: str, seller: str):
    new_product = {
        "id": len(products_db) + 1,
        "title": title,
        "description": description,
        "price": price,
        "category": category,
        "seller": seller,
        "image_url": "https://via.placeholder.com/300x200",
        "created_at": datetime.now().isoformat()
    }
    products_db.append(new_product)
    return new_product

@app.delete("/api/products/{product_id}")
def delete_product(product_id: int):
    global products_db
    products_db = [p for p in products_db if p["id"] != product_id]
    return {"message": "Product deleted"}

# Categories
@app.get("/api/categories")
def get_categories():
    return categories_db

# Users
@app.get("/api/users/me")
def get_current_user():
    return users_db[0]  # Mock current user

@app.get("/api/users/{user_id}")
def get_user(user_id: int):
    user = next((u for u in users_db if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"id": user["id"], "username": user["username"], "email": user["email"], "role": user["role"]}

# Deals
@app.post("/api/deals")
def create_deal(request: CreateDealRequest):
    product = next((p for p in products_db if p["id"] == request.product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    new_deal = {
        "id": len(deals_db) + 1,
        "buyer_id": 1,  # Mock user
        "product_id": request.product_id,
        "status": "pending",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
        "product": product
    }
    deals_db.append(new_deal)
    return new_deal

@app.get("/api/deals")
def get_deals():
    return deals_db

@app.get("/api/deals/{deal_id}")
def get_deal(deal_id: int):
    deal = next((d for d in deals_db if d["id"] == deal_id), None)
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    return deal

@app.put("/api/deals/{deal_id}/status")
def update_deal_status(deal_id: int, request: UpdateDealStatusRequest):
    deal = next((d for d in deals_db if d["id"] == deal_id), None)
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    
    deal["status"] = request.status
    deal["updated_at"] = datetime.now().isoformat()
    
    if request.status == "completed":
        deal["completed_at"] = datetime.now().isoformat()
    
    # Add system message
    system_message = {
        "id": len(messages_db) + 1,
        "deal_id": deal_id,
        "sender_id": 0,
        "message": f"Status updated to {request.status}",
        "is_system": True,
        "created_at": datetime.now().isoformat()
    }
    messages_db.append(system_message)
    
    return deal

@app.get("/api/deals/{deal_id}/messages")
def get_messages(deal_id: int):
    deal_messages = [m for m in messages_db if m["deal_id"] == deal_id]
    return deal_messages

@app.post("/api/deals/{deal_id}/messages")
def send_message(deal_id: int, request: SendMessageRequest):
    deal = next((d for d in deals_db if d["id"] == deal_id), None)
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    
    new_message = {
        "id": len(messages_db) + 1,
        "deal_id": deal_id,
        "sender_id": 1,  # Mock user
        "message": request.message,
        "is_system": False,
        "created_at": datetime.now().isoformat()
    }
    messages_db.append(new_message)
    return new_message

# Export app for Vercel (ASGI)
# Vercel supports ASGI apps directly
