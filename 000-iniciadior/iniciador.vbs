Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c C:\xampp\mysql_start.bat", 0, false
WshShell.Run "cmd /c C:\xampp\apache_start.bat", 0, false

:finish