@echo off
title DoodleFlow - Servidor Local
echo.
echo  ==================================================
echo     DoodleFlow - Iniciando servidor local...
echo  ==================================================
echo.
echo  Abriendo en: http://localhost:7890
echo  Cierra esta ventana para detener el servidor.
echo.

:: Esperar 1 segundo y abrir el navegador con la URL correcta (parentesis codificados)
ping -n 2 127.0.0.1 >nul
start "" "http://localhost:7890/doodleflow_con_vectorizador%%20%%283%%29.html"

:: Iniciar el servidor Python (queda activo hasta cerrar la ventana)
python -m http.server 7890 --directory "%~dp0"
