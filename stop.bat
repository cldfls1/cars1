@echo off
title CarX Mods Club - Stopping Servers
color 0C

echo ╔═══════════════════════════════════════════════════════╗
echo ║                                                       ║
echo ║          CarX Mods Club - Stopping Servers            ║
echo ║                                                       ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

echo Stopping all Python processes (uvicorn)...
taskkill /F /IM python.exe /T >nul 2>&1

echo Stopping all Node processes (vite)...
taskkill /F /IM node.exe /T >nul 2>&1

echo.
echo Servers stopped!
echo.
pause
