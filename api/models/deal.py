from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum, func
from sqlalchemy.orm import relationship
from database import Base
import enum

class DealStatus(enum.Enum):
    PENDING = "pending"  # Buyer requested, waiting for seller
    ACCEPTED = "accepted"  # Seller accepted, waiting for payment
    PAYMENT_SENT = "payment_sent"  # Buyer sent Steam card
    COMPLETED = "completed"  # Deal completed successfully
    REJECTED = "rejected"  # Seller rejected
    CANCELLED = "cancelled"  # Buyer cancelled
    DISPUTED = "disputed"  # Issue with the deal

class Deal(Base):
    __tablename__ = "deals"

    id = Column(Integer, primary_key=True, index=True)
    buyer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    
    status = Column(Enum(DealStatus), default=DealStatus.PENDING)
    steam_card_code = Column(String, nullable=True)  # Steam gift card code
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    buyer = relationship("User", foreign_keys=[buyer_id])
    product = relationship("Product", back_populates="deals")
    messages = relationship("DealMessage", back_populates="deal", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "buyer_id": self.buyer_id,
            "product_id": self.product_id,
            "status": self.status.value,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
        }

class DealMessage(Base):
    __tablename__ = "deal_messages"

    id = Column(Integer, primary_key=True, index=True)
    deal_id = Column(Integer, ForeignKey("deals.id"), nullable=False)
    sender_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    message = Column(Text, nullable=False)
    is_system = Column(Integer, default=0)  # 0 = user message, 1 = system message
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    deal = relationship("Deal", back_populates="messages")
    sender = relationship("User", foreign_keys=[sender_id])

    def to_dict(self):
        return {
            "id": self.id,
            "deal_id": self.deal_id,
            "sender_id": self.sender_id,
            "message": self.message,
            "is_system": bool(self.is_system),
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
