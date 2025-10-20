@echo off
echo ========================================
echo ПОЭТАПНАЯ УСТАНОВКА (НАЙДЕМ ВИНОВНИКА!)
echo ========================================
echo.

cd api

echo [1/11] Installing fastapi...
pip install fastapi
if errorlevel 1 goto :error1

echo [2/11] Installing uvicorn...
pip install uvicorn
if errorlevel 1 goto :error2

echo [3/11] Installing sqlalchemy...
pip install sqlalchemy
if errorlevel 1 goto :error3

echo [4/11] Installing pyjwt...
pip install pyjwt
if errorlevel 1 goto :error4

echo [5/11] Installing python-multipart...
pip install python-multipart
if errorlevel 1 goto :error5

echo [6/11] Installing pydantic...
pip install pydantic
if errorlevel 1 goto :error6

echo [7/11] Installing pydantic-settings...
pip install pydantic-settings
if errorlevel 1 goto :error7

echo [8/11] Installing python-dotenv...
pip install python-dotenv
if errorlevel 1 goto :error8

echo [9/11] Installing asyncpg...
pip install asyncpg
if errorlevel 1 goto :error9

echo [10/11] Installing websockets...
pip install websockets
if errorlevel 1 goto :error10

echo [11/11] Installing httpx...
pip install httpx
if errorlevel 1 goto :error11

echo.
echo ========================================
echo ВСЕ УСТАНОВЛЕНО УСПЕШНО!
echo ========================================
goto :end

:error1
echo ОШИБКА: fastapi
goto :end

:error2
echo ОШИБКА: uvicorn
goto :end

:error3
echo ОШИБКА: sqlalchemy
goto :end

:error4
echo ОШИБКА: pyjwt
goto :end

:error5
echo ОШИБКА: python-multipart
goto :end

:error6
echo ОШИБКА: pydantic
goto :end

:error7
echo ОШИБКА: pydantic-settings - ВОТ ОН!
goto :end

:error8
echo ОШИБКА: python-dotenv
goto :end

:error9
echo ОШИБКА: asyncpg - ВОТ ОН!
goto :end

:error10
echo ОШИБКА: websockets
goto :end

:error11
echo ОШИБКА: httpx
goto :end

:end
pause
