#!/bin/bash

# Swadeshi Hind Party - Next.js Deployment Script
# This script builds and deploys the Next.js application

echo "🚀 Starting Swadeshi Hind Party deployment..."

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Build the application
echo "🔨 Building Next.js application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"

    # Start the production server
    echo "🌐 Starting production server..."
    npm run start
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi

echo "🎉 Deployment complete! Your Next.js app is now running."