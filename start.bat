@echo off
title CarX Mods Club - Starting...
color 0A

echo ╔═══════════════════════════════════════════════════════╗
echo ║                                                       ║
echo ║          CarX Mods Club - Starting Servers           ║
echo ║                                                       ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

REM Проверка установки зависимостей
if not exist "api\main.py" (
    echo ERROR: Backend not found!
    pause
    exit /b 1
)

if not exist "client\node_modules" (
    echo WARNING: Frontend dependencies not installed!
    echo Run: cd client ^&^& npm install
    pause
)

echo Starting Backend and Frontend...
echo.
echo Backend will run on: http://localhost:8000
echo Frontend will run on: http://localhost:5173
echo.
echo Press Ctrl+C in each window to stop servers
echo.
pause

REM Запуск Backend в новом окне
start "CarX Mods - Backend (Port 8000)" cmd /k "cd /d %~dp0api && echo Starting Backend... && uvicorn main:app --reload --port 8000"

REM Небольшая задержка
timeout /t 2 /nobreak >nul

REM Запуск Frontend в новом окне
start "CarX Mods - Frontend (Port 5173)" cmd /k "cd /d %~dp0client && echo Starting Frontend... && npm run dev"

REM Небольшая задержка перед открытием браузера
timeout /t 5 /nobreak >nul

REM Открыть браузер
start http://localhost:5173

echo.
echo ╔═══════════════════════════════════════════════════════╗
echo ║                                                       ║
echo ║              Servers Started Successfully!            ║
echo ║                                                       ║
echo ║  Backend:  http://localhost:8000                     ║
echo ║  Frontend: http://localhost:5173                     ║
echo ║  API Docs: http://localhost:8000/docs                ║
echo ║                                                       ║
echo ║  Close this window or press any key to exit          ║
echo ║  (Servers will continue running)                     ║
echo ║                                                       ║
echo ╚═══════════════════════════════════════════════════════╝
echo.
pause
