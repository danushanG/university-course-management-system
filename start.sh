#!/bin/bash

echo "Starting University Course Management System..."
echo

echo "Starting Backend (Spring Boot)..."
cd backend
./mvnw spring-boot:run &
BACKEND_PID=$!
cd ..

echo
echo "Starting Frontend (React)..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo
echo "Applications are starting..."
echo "Backend will be available at: http://localhost:8080"
echo "Frontend will be available at: http://localhost:3000"
echo
echo "Press Ctrl+C to stop both applications..."

# Wait for user interrupt
trap "echo 'Stopping applications...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
