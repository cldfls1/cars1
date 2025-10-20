"""
Database initialization script
Creates admin user and sample data
"""
import asyncio
import os
from dotenv import load_dotenv

from database import AsyncSessionLocal, engine, Base
from models import User, Category, Product
from services.auth_service import get_password_hash

load_dotenv()

async def init_database():
    print("Creating database tables...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("✓ Tables created")

    async with AsyncSessionLocal() as session:
        # Create admin user
        admin_username = os.getenv("ADMIN_USERNAME", "seller")
        admin_password = os.getenv("ADMIN_PASSWORD", "admin123")
        
        print(f"\nCreating admin user: {admin_username}")
        admin = User(
            username=admin_username,
            password_hash=get_password_hash(admin_password),
            is_admin=True,
            is_banned=False
        )
        session.add(admin)
        
        # Create sample categories
        print("\nCreating sample categories...")
        categories = [
            Category(
                name_ru="Паки модов",
                name_en="Mod Packs",
                description_ru="Полные паки модов для CarX",
                description_en="Complete mod packs for CarX",
                icon="package"
            ),
            Category(
                name_ru="Туториалы",
                name_en="Tutorials",
                description_ru="Обучающие материалы по моддингу",
                description_en="Modding tutorial materials",
                icon="book"
            ),
        ]
        for cat in categories:
            session.add(cat)
        
        await session.commit()
        
        # Create sample products
        print("Creating sample products...")
        products = [
            Product(
                category_id=1,
                title_ru="Базовый пак модов",
                title_en="Basic Mod Pack",
                description_ru="Стартовый набор модов для новичков. Включает основные модификации автомобилей и треков.",
                description_en="Starter mod pack for beginners. Includes basic car and track modifications.",
                price=500.0,
                currency="RUB",
                image_url="https://via.placeholder.com/400x300",
                download_link="https://example.com/download/basic",
                is_active=True
            ),
            Product(
                category_id=1,
                title_ru="Премиум пак модов",
                title_en="Premium Mod Pack",
                description_ru="Расширенный набор модов с эксклюзивным контентом. Более 50 автомобилей и 20 треков.",
                description_en="Extended mod pack with exclusive content. Over 50 cars and 20 tracks.",
                price=1500.0,
                currency="RUB",
                image_url="https://via.placeholder.com/400x300",
                download_link="https://example.com/download/premium",
                is_active=True
            ),
            Product(
                category_id=2,
                title_ru="Полный туториал по моддингу",
                title_en="Complete Modding Tutorial",
                description_ru="Подробное руководство по созданию модов. Видео + текстовые материалы.",
                description_en="Comprehensive guide to mod creation. Video + text materials.",
                price=800.0,
                currency="RUB",
                image_url="https://via.placeholder.com/400x300",
                download_link="https://example.com/download/tutorial",
                is_active=True
            ),
        ]
        for prod in products:
            session.add(prod)
        
        await session.commit()
        print("✓ Sample data created")
    
    print("\n" + "="*50)
    print("DATABASE INITIALIZED SUCCESSFULLY!")
    print("="*50)
    print(f"\nAdmin credentials:")
    print(f"  Username: {admin_username}")
    print(f"  Password: {admin_password}")
    print("\n⚠️  CHANGE THE ADMIN PASSWORD AFTER FIRST LOGIN!")
    print("="*50)

if __name__ == "__main__":
    asyncio.run(init_database())
