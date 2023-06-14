#!/bin/sh
echo "Generating Prisma Client"
npx prisma generate
echo "Deploying Prisma Migrations"
npx prisma migrate deploy
npx prisma migrate reset --force --skip-seed
echo "Seed Database"
node .
