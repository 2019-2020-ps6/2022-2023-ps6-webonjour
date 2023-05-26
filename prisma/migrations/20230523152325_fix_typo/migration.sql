/*
  Warnings:

  - You are about to drop the `Accomodation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AccomodationToPatient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AccomodationToPatient" DROP CONSTRAINT "_AccomodationToPatient_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccomodationToPatient" DROP CONSTRAINT "_AccomodationToPatient_B_fkey";

-- DropTable
DROP TABLE "Accomodation";

-- DropTable
DROP TABLE "_AccomodationToPatient";

-- CreateTable
CREATE TABLE "Accommodation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccommodationToPatient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AccommodationToPatient_AB_unique" ON "_AccommodationToPatient"("A", "B");

-- CreateIndex
CREATE INDEX "_AccommodationToPatient_B_index" ON "_AccommodationToPatient"("B");

-- AddForeignKey
ALTER TABLE "_AccommodationToPatient" ADD CONSTRAINT "_AccommodationToPatient_A_fkey" FOREIGN KEY ("A") REFERENCES "Accommodation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccommodationToPatient" ADD CONSTRAINT "_AccommodationToPatient_B_fkey" FOREIGN KEY ("B") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
