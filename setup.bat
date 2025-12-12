@echo off
REM PocketFinds Quick Start Script (Windows)
REM This script helps you set up and run both frontend and backend

echo.
echo ============================================
echo  PocketFinds - Quick Start Setup
echo ============================================
echo.

REM Check if backend/.env exists
if not exist "backend\.env" (
    echo Creating backend\.env from template...
    if exist "backend\.env.example" (
        copy "backend\.env.example" "backend\.env"
        echo Created backend\.env - Please edit it with your MongoDB URI
    )
)

REM Check if frontend/.env.local exists
if not exist "frontend\.env.local" (
    echo Creating frontend\.env.local...
    (
        echo NEXT_PUBLIC_API_URL=http://localhost:5000/api
    ) > "frontend\.env.local"
    echo Created frontend\.env.local
)

echo.
echo Step 1: Installing backend dependencies...
cd backend
if not exist "node_modules" (
    echo Installing backend packages...
    npm install
)
cd ..

echo.
echo Step 2: Installing frontend dependencies...
cd frontend
if not exist "node_modules" (
    echo Installing frontend packages...
    npm install
)
cd ..

echo.
echo ============================================
echo  Setup Complete!
echo ============================================
echo.
echo To start development:
echo.
echo Terminal 1 (Backend):
echo   cd backend
echo   npm run dev
echo.
echo Terminal 2 (Frontend):
echo   cd frontend
echo   npm run dev
echo.
echo Then visit: http://localhost:3000
echo.
echo API will be running on: http://localhost:5000
echo.
echo Make sure MongoDB is running before starting the backend!
echo.
pause
