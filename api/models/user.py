from sqlalchemy import Column, Integer, String, Boolean, DateTime, func
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    is_admin = Column(Boolean, default=False)
    is_banned = Column(Boolean, default=False)
    is_online = Column(Boolean, default=False)
    last_activity = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Optional fields for notifications
    email = Column(String, nullable=True)
    telegram_id = Column(String, nullable=True)
    push_subscription = Column(String, nullable=True)  # JSON string for push notifications
    
    # Notification preferences
    notify_email = Column(Boolean, default=False)
    notify_telegram = Column(Boolean, default=False)
    notify_push = Column(Boolean, default=True)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "is_admin": self.is_admin,
            "is_banned": self.is_banned,
            "is_online": self.is_online,
            "last_activity": self.last_activity.isoformat() if self.last_activity else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "email": self.email,
            "telegram_id": self.telegram_id,
            "notify_email": self.notify_email,
            "notify_telegram": self.notify_telegram,
            "notify_push": self.notify_push,
        }
