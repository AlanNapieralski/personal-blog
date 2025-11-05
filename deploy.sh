#!/bin/bash
set -e

echo "🚀 Deploying personal-blog to production..."

# Pull latest changes
git pull origin main

# Set production environment variables
export DB_PASSWORD="${DB_PASSWORD:-changeme}"

# Stop existing containers
docker compose -f docker-compose.prod.yml down

# Build and start containers
docker compose -f docker-compose.prod.yml up -d --build

# Show status
docker compose -f docker-compose.prod.yml ps

echo "✅ Deployment complete!"
echo "Frontend: http://$(curl -s ifconfig.me)"
echo "Drupal: http://$(curl -s ifconfig.me):8080"
