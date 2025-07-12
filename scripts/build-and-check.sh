#!/bin/bash
# Script to build and check Docker image size

echo "🐳 Building optimized production Docker image..."

# Build the image
docker build -f Dockerfile.prod -t nodejs-clean-architecture:local .

# Check image size
echo ""
echo "📊 Image Information:"
docker images nodejs-clean-architecture:local --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"

# Get detailed size breakdown
echo ""
echo "🔍 Layer Analysis:"
docker history nodejs-clean-architecture:local --format "table {{.CreatedBy}}\t{{.Size}}" | head -10

# Security scan (if available)
if command -v docker &> /dev/null; then
    echo ""
    echo "🔒 Running basic security check..."
    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
        -v $(pwd):/app aquasec/trivy:latest image nodejs-clean-architecture:local || echo "Trivy not available, skipping security scan"
fi

echo ""
echo "✅ Build complete! Target: <200MB, Actual size shown above"
echo "💡 If size is >200MB, consider removing unnecessary dependencies"
