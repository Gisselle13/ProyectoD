@echo off
echo Iniciando MySQL y Apache...
start "" "C:\xampp\mysql_start.bat"
start "" "C:\xampp\apache_start.bat"
echo MySQL y Apache iniciados correctamente.



cd C:\xampp\htdocs\sistema_inmujer
ng serve