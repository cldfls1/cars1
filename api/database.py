import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from sqlalchemy.pool import NullPool

# Get DATABASE_URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError(
        "DATABASE_URL environment variable is not set. "
        "Please add it in Vercel Environment Variables: "
        "Settings > Environment Variables > DATABASE_URL"
    )

# Ensure we use asyncpg driver
# Convert postgres:// or postgresql:// to postgresql+asyncpg://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
elif DATABASE_URL.startswith("postgresql://") and "+asyncpg" not in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

# Remove sslmode parameter from URL (asyncpg doesn't support it in URL)
if "?sslmode=" in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.split("?")[0]

# Create async engine with NullPool for serverless
# NullPool = no connection reuse, each request gets fresh connection
engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    poolclass=NullPool,  # Critical for serverless - prevents event loop conflicts
    connect_args={"ssl": "require"}  # SSL mode for asyncpg
)

# Session maker
async_session_maker = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

# Base for models
Base = declarative_base()

# Dependency
async def get_db():
    async with async_session_maker() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
