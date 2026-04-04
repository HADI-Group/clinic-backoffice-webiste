#!/bin/sh
set -e

echo "🚀 Starting Fusion Starter..."

# Optional: wait for dependencies (DB, etc.)
# echo "⏳ Waiting for DB..."
# sleep 5

# Optional: run migration
# pnpm prisma migrate deploy

# Debug env
echo "NODE_ENV=$NODE_ENV"
echo "PORT=$PORT"

# Start app
exec node dist/server/node-build.mjs