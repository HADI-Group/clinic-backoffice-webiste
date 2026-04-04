#!/bin/sh
set -e

echo "🚀 Starting Frontend (Vite + Nginx)..."

# Debug env
echo "API URL: $VITE_BACKOFFICE_API_URL"

# Start nginx
exec nginx -g "daemon off;"