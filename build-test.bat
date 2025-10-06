@echo off
echo ============================================
echo DartClub Manager - Build Test
echo ============================================
echo.

cd /d "C:\SoftwareEntwicklung\DartClubManager\Dart App"

echo [1/3] Cleaning...
call gradlew.bat clean

echo.
echo [2/3] Compiling Backend...
call gradlew.bat :backend:compileJava > build-result.txt 2>&1

echo.
echo [3/3] Checking Result...
type build-result.txt

echo.
echo ============================================
if exist "backend\build\classes\java\main\com\dartclub\DartClubApplication.class" (
    echo BUILD SUCCESSFUL
    exit /b 0
) else (
    echo BUILD FAILED
    exit /b 1
)
