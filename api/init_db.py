"""
Database initialization script
Run this once to create tables and add initial data
"""
import asyncio
from database import engine, Base
from models import User, Product
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

async def init_database():
    # Create all tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    
    print("✓ Tables created")
    
    # Add initial data
    async with AsyncSession(engine) as session:
        # Add users
        users = [
            User(username="admin", email="admin@example.com", role="admin", password="admin123"),
            User(username="seller", email="seller@example.com", role="seller", password="seller123")
        ]
        session.add_all(users)
        await session.commit()
        print("✓ Users added")
        
        # Add products
        products = [
            Product(
                title="BMW M3 E46 Mod",
                description="High quality BMW M3 E46 mod with custom liveries",
                price=9.99,
                category="Cars",
                seller="ModMaker123",
                image_url="https://via.placeholder.com/300x200"
            ),
            Product(
                title="Custom Sound Pack",
                description="Realistic engine sounds pack",
                price=4.99,
                category="Audio",
                seller="SoundPro",
                image_url="https://via.placeholder.com/300x200"
            ),
            Product(
                title="Drift Map Bundle",
                description="5 amazing drift tracks",
                price=14.99,
                category="Maps",
                seller="MapMaster",
                image_url="https://via.placeholder.com/300x200"
            ),
            Product(
                title="Racing Livery Pack",
                description="Professional racing liveries collection",
                price=7.99,
                category="Liveries",
                seller="DesignPro",
                image_url="https://via.placeholder.com/300x200"
            ),
            Product(
                title="Turbo Performance Kit",
                description="Upgrade your car performance",
                price=12.99,
                category="Parts",
                seller="TuningExp",
                image_url="https://via.placeholder.com/300x200"
            )
        ]
        session.add_all(products)
        await session.commit()
        print("✓ Products added")
    
    print("✅ Database initialized successfully!")

if __name__ == "__main__":
    asyncio.run(init_database())
