"""
Vercel serverless function entry point
"""
from main import app

# Vercel requires the ASGI app to be named 'app' or exported
# This file serves as the entry point for Vercel serverless functions
