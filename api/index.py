"""
Vercel serverless function entry point
"""
from mangum import Mangum
from main import app

# Wrap FastAPI app with Mangum for AWS Lambda/Vercel compatibility
handler = Mangum(app, lifespan="off")
