@echo off
cd /d "%~dp0"
start "KD-Server" cmd /k "C:\Users\wtx55\.workbuddy\binaries\python\versions\3.13.12\python.exe serve.py"
timeout /t 2 >nul
start "" "http://127.0.0.1:8080/"
echo KD web server launched in a separate window.
echo Close the KD-Server window to stop the server.
pause
