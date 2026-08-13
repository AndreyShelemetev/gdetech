#!/bin/sh
set -e

echo "Waiting for database migrations..."
npx prisma migrate deploy

echo "Seeding admin account..."
npx prisma db seed

echo "Starting Next.js..."
exec "$@"
