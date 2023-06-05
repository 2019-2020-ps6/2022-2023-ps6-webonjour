-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "profilePictureUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "diseaseStage" "DiseaseStage" NOT NULL,
    "lastQuizDate" TIMESTAMP(3) NOT NULL,
    "floor" INTEGER NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyMember" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "profilePictureUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,

    CONSTRAINT "FamilyMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accomodation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Accomodation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PatientToQuiz" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FamilyMemberToPatient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AccomodationToPatient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PatientToQuiz_AB_unique" ON "_PatientToQuiz"("A", "B");

-- CreateIndex
CREATE INDEX "_PatientToQuiz_B_index" ON "_PatientToQuiz"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FamilyMemberToPatient_AB_unique" ON "_FamilyMemberToPatient"("A", "B");

-- CreateIndex
CREATE INDEX "_FamilyMemberToPatient_B_index" ON "_FamilyMemberToPatient"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AccomodationToPatient_AB_unique" ON "_AccomodationToPatient"("A", "B");

-- CreateIndex
CREATE INDEX "_AccomodationToPatient_B_index" ON "_AccomodationToPatient"("B");

-- AddForeignKey
ALTER TABLE "_PatientToQuiz" ADD CONSTRAINT "_PatientToQuiz_A_fkey" FOREIGN KEY ("A") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientToQuiz" ADD CONSTRAINT "_PatientToQuiz_B_fkey" FOREIGN KEY ("B") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FamilyMemberToPatient" ADD CONSTRAINT "_FamilyMemberToPatient_A_fkey" FOREIGN KEY ("A") REFERENCES "FamilyMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FamilyMemberToPatient" ADD CONSTRAINT "_FamilyMemberToPatient_B_fkey" FOREIGN KEY ("B") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccomodationToPatient" ADD CONSTRAINT "_AccomodationToPatient_A_fkey" FOREIGN KEY ("A") REFERENCES "Accomodation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccomodationToPatient" ADD CONSTRAINT "_AccomodationToPatient_B_fkey" FOREIGN KEY ("B") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
