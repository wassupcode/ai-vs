@echo off
SETLOCAL

:: Пути к проектам
SET BACKEND_PATH=D:\Desktop\ai-assistant\backend
SET FRONTEND_PATH=D:\Desktop\ai-assistant\frontend

:: Запуск бэкенда в новом окне
start "AI Assistant Backend" cmd /k "cd /d %BACKEND_PATH% && npm start"

:: Запуск фронтенда в новом окне
start "AI Assistant Frontend" cmd /k "cd /d %FRONTEND_PATH% && npm start"

:: Информация
echo Service start sucessfully
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
ENDLOCAL