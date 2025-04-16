@echo off
setlocal

REM Get current username and construct paths
set "username=%USERNAME%"
set "addinFilePath=C:\ProgramData\Autodesk\Revit\Addins\2024\KaabliKataloog.addin"
set "dllPath=C:\Users\%username%\EULE Dropbox\0_EULE  Team folder (kogu kollektiiv)\02_EULE REVIT TEMPLATE\099-scriptid\Pluginad\KaabliKataloog.dll"

REM Create the .addin file content
(
echo ^<?xml version="1.0" encoding="utf-8" standalone="no"?^>
echo ^<RevitAddIns^>
echo   ^<AddIn Type="Application"^>
echo     ^<Name^>KaabliKataloog^</Name^>
echo     ^<Assembly^>"%dllPath%"^</Assembly^>
echo     ^<AddInId^>589b0daf-b90e-4dde-a3f5-8d3c8a03baf7^</AddInId^>
echo     ^<FullClassName^>KaabliKataloog.App^</FullClassName^>
echo     ^<VendorId^>RK^</VendorId^>
echo     ^<VendorDescription^>Raul Kalev^</VendorDescription^>
echo   ^</AddIn^>
echo ^</RevitAddIns^>
) > "%addinFilePath%"

echo .addin file created at: %addinFilePath%
pause
