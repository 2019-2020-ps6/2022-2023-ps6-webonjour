-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePictureUrl" TEXT,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;
