@echo off
:: Завершение процессов Node.js
taskkill /F /IM node.exe /T >nul 2>&1

:: Дополнительно закрываем окна (если остались)
taskkill /FI "WINDOWTITLE eq AI Assistant Backend*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq AI Assistant Frontend*" /F >nul 2>&1

:: Очистка портов (опционально)
:: netstat -ano | findstr :3000 >nul && (
::    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
::        taskkill /F /PID %%a
::    )
:: )

echo Service stopped sucessfully
timeout /t 2 >nul