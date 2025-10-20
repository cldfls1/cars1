from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    
    # Multilingual fields
    title_ru = Column(String, nullable=False)
    title_en = Column(String, nullable=False)
    description_ru = Column(Text, nullable=False)
    description_en = Column(Text, nullable=False)
    
    # Product details
    price = Column(Float, nullable=False)
    currency = Column(String, default="RUB")  # RUB, USD, EUR
    image_url = Column(String, nullable=True)
    download_link = Column(String, nullable=True)  # Link to the mod pack
    
    # Status
    is_active = Column(Boolean, default=True)
    stock_quantity = Column(Integer, default=999)  # For digital goods, can be unlimited
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    category = relationship("Category", back_populates="products")
    deals = relationship("Deal", back_populates="product")

    def to_dict(self, lang="ru"):
        return {
            "id": self.id,
            "category_id": self.category_id,
            "title": self.title_ru if lang == "ru" else self.title_en,
            "description": self.description_ru if lang == "ru" else self.description_en,
            "price": self.price,
            "currency": self.currency,
            "image_url": self.image_url,
            "is_active": self.is_active,
            "stock_quantity": self.stock_quantity,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
