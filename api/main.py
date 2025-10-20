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
def register(username: str, email: str, password: str):
    if any(u["username"] == username for u in users_db):
        raise HTTPException(status_code=400, detail="Username already exists")
    
    new_user = {
        "id": len(users_db) + 1,
        "username": username,
        "email": email,
        "role": "user",
        "password": password
    }
    users_db.append(new_user)
    return {"message": "User registered successfully", "user_id": new_user["id"]}

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
