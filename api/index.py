"""
Vercel serverless function entry point
"""
from mangum import Mangum
from main import app

# Export handler for Vercel
handler = Mangum(app, lifespan="off")

# Also export app for local testing
__all__ = ["handler", "app"]
