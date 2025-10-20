from sqlalchemy import Column, Integer, String, Text, DateTime, func
from sqlalchemy.orm import relationship
from database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name_ru = Column(String, nullable=False)
    name_en = Column(String, nullable=False)
    description_ru = Column(Text, nullable=True)
    description_en = Column(Text, nullable=True)
    icon = Column(String, nullable=True)  # Icon name or URL
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationship
    products = relationship("Product", back_populates="category", cascade="all, delete-orphan")

    def to_dict(self, lang="ru"):
        return {
            "id": self.id,
            "name": self.name_ru if lang == "ru" else self.name_en,
            "description": self.description_ru if lang == "ru" else self.description_en,
            "icon": self.icon,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
