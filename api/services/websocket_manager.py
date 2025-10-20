from fastapi import WebSocket
from typing import Dict, List
from datetime import datetime
import json

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, WebSocket] = {}
        self.user_activity: Dict[int, datetime] = {}

    async def connect(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        self.active_connections[user_id] = websocket
        self.user_activity[user_id] = datetime.utcnow()
        
        # Notify others that this user is online
        await self.broadcast_user_status(user_id, True)

    def disconnect(self, user_id: int):
        if user_id in self.active_connections:
            del self.active_connections[user_id]
        if user_id in self.user_activity:
            del self.user_activity[user_id]
        
        # Note: We should broadcast offline status, but since the connection
        # is already closed, we'd need to do this from the calling code

    async def send_personal_message(self, message: dict, user_id: int):
        if user_id in self.active_connections:
            try:
                await self.active_connections[user_id].send_json(message)
            except Exception as e:
                print(f"Error sending message to user {user_id}: {e}")
                self.disconnect(user_id)

    async def broadcast(self, message: dict):
        disconnected_users = []
        for user_id, connection in self.active_connections.items():
            try:
                await connection.send_json(message)
            except Exception:
                disconnected_users.append(user_id)
        
        for user_id in disconnected_users:
            self.disconnect(user_id)

    async def broadcast_user_status(self, user_id: int, is_online: bool):
        message = {
            "type": "user_status",
            "user_id": user_id,
            "is_online": is_online,
            "timestamp": datetime.utcnow().isoformat()
        }
        await self.broadcast(message)

    async def update_activity(self, user_id: int):
        self.user_activity[user_id] = datetime.utcnow()

    def is_user_online(self, user_id: int) -> bool:
        return user_id in self.active_connections

    def get_online_users(self) -> List[int]:
        return list(self.active_connections.keys())

manager = ConnectionManager()
