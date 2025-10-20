@echo off
title CarX Mods Club - Backend
color 0B

echo ╔═══════════════════════════════════════════════════════╗
echo ║                                                       ║
echo ║            CarX Mods Club - Backend Server            ║
echo ║                                                       ║
echo ╚═══════════════════════════════════════════════════════╝
echo.
echo Starting on http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo.

cd api
uvicorn main:app --reload --port 8000
