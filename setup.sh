#!/bin/bash

echo "========================================"
echo "CarX Mods Club - Setup Script"
echo "========================================"
echo ""

echo "[1/3] Installing Python dependencies..."
cd api
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install Python dependencies"
    exit 1
fi
cd ..
echo "✓ Python dependencies installed"
echo ""

echo "[2/3] Installing Node.js dependencies..."
cd client
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install Node.js dependencies"
    exit 1
fi
cd ..
echo "✓ Node.js dependencies installed"
echo ""

echo "[3/3] Setup complete!"
echo ""
echo "========================================"
echo "Next steps:"
echo "========================================"
echo "1. Create .env file in the root directory"
echo "2. Run: cd api && python init_db.py"
echo "3. Start backend: cd api && uvicorn main:app --reload"
echo "4. Start frontend: cd client && npm run dev"
echo ""
echo "See GETTING_STARTED.md for detailed instructions"
echo "========================================"
