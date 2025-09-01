@echo off
echo Starting University Course Management System...
echo.

echo Starting Backend (Spring Boot)...
cd backend
start "Backend" cmd /k "mvnw spring-boot:run"
cd ..

echo.
echo Starting Frontend (React)...
cd frontend
start "Frontend" cmd /k "npm start"
cd ..

echo.
echo Applications are starting...
echo Backend will be available at: http://localhost:8080
echo Frontend will be available at: http://localhost:3000
echo.
echo Press any key to exit this script...
pause > nul
