from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

from database import engine, Base
from routes import auth, users, products, categories, deals, admin, notifications
from services.websocket_manager import manager

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Shutdown
    pass

app = FastAPI(
    title="CarX Mods Club API",
    description="Trading platform for game mods",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(categories.router, prefix="/api/categories", tags=["Categories"])
app.include_router(deals.router, prefix="/api/deals", tags=["Deals"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["Notifications"])

@app.get("/")
async def root():
    return {"message": "CarX Mods Club API", "status": "running"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int):
    await manager.connect(websocket, user_id)
    try:
        while True:
            data = await websocket.receive_json()
            # Handle different message types
            if data.get("type") == "heartbeat":
                await manager.send_personal_message(
                    {"type": "heartbeat_ack", "timestamp": data.get("timestamp")},
                    user_id
                )
            elif data.get("type") == "activity":
                await manager.update_activity(user_id)
    except WebSocketDisconnect:
        manager.disconnect(user_id)
