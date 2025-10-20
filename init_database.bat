@echo off
title CarX Mods Club - Initialize Database
color 0D

echo ╔═══════════════════════════════════════════════════════╗
echo ║                                                       ║
echo ║         CarX Mods Club - Database Initialization      ║
echo ║                                                       ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

REM Проверка .env файла
if not exist ".env" (
    echo WARNING: .env file not found!
    echo.
    echo Creating .env from template...
    copy .env.example .env
    echo.
    echo Please edit .env file with your settings:
    echo - DATABASE_URL
    echo - JWT_SECRET
    echo - Admin credentials
    echo.
    echo After editing, run this script again.
    pause
    exit /b 1
)

echo Initializing database...
echo This will:
echo - Create all tables
echo - Create admin user (seller)
echo - Add sample categories and products
echo.
pause

cd api
python init_db.py

if errorlevel 1 (
    echo.
    echo ERROR: Database initialization failed!
    echo Check your DATABASE_URL in .env file
    pause
    exit /b 1
)

echo.
echo ╔═══════════════════════════════════════════════════════╗
echo ║                                                       ║
echo ║        Database Initialized Successfully! ✓           ║
echo ║                                                       ║
echo ║  Admin login: seller                                  ║
echo ║  Admin password: check .env file                      ║
echo ║                                                       ║
echo ║  You can now start the servers with start.bat         ║
echo ║                                                       ║
echo ╚═══════════════════════════════════════════════════════╝
echo.
pause
