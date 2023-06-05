/*
  Warnings:

  - You are about to drop the column `clickRatio` on the `QuizSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuestionResult" ADD COLUMN     "clickRatio" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "QuizSession" DROP COLUMN "clickRatio";
