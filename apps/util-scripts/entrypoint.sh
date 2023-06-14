#!/bin/sh
echo "Generating Prisma Client"
npx prisma generate
echo "Deploying Prisma Migrations"
npx prisma migrate deploy
echo "Seed Database"
node .
