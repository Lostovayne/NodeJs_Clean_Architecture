@echo off
REM Script to build and check Docker image size on Windows

echo 🐳 Building optimized production Docker image...

REM Build the image
docker build -f Dockerfile.prod -t nodejs-clean-architecture:local .

REM Check image size
echo.
echo 📊 Image Information:
docker images nodejs-clean-architecture:local

REM Get detailed size breakdown
echo.
echo 🔍 Layer Analysis:
docker history nodejs-clean-architecture:local

echo.
echo ✅ Build complete! Target: ^<200MB, Actual size shown above
echo 💡 If size is ^>200MB, consider removing unnecessary dependencies

pause
