import { PrismaClient } from '@prisma/client';
import {
  authMocks,
  patientMocks,
  quizMocks,
} from '@webonjour/data-access-mocks';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function main() {
  for (const quiz of quizMocks.quizList) {
    await prisma.quiz.create({
      data: {
        title: quiz.title,
        isPrivate: quiz.isPrivate,
        imageUrl: quiz.imageUrl,
        questions: {
          create: quiz.questions.map((question) => {
            return {
              title: question.title,
              image: question.image,
              type: question.type,
              clues: {
                create: question.clues.map((clue) => {
                  return {
                    text: clue.text,
                    image: clue.image,
                  };
                }),
              },
              answers: {
                create: question.answers.map((answer) => {
                  return {
                    text: answer.text,
                    image: answer.image,
                    isCorrect: answer.isCorrect,
                  };
                }),
              },
            };
          }),
        },
      },
    });
  }

  for (const patient of patientMocks.patientMocks) {
    await prisma.patient.create({
      data: {
        firstName: patient.firstName,
        lastName: patient.lastName,
        age: patient.age,
        profilePictureUrl: patient.profilePictureUrl,
        description: patient.description,
        diseaseStage: patient.diseaseStage,
        floor: patient.floor,
        quizzes: {
          connect: Object.keys(patientMocks.patientQuizMocks).map((key) => {
            return {
              id: parseInt(key),
            };
          }),
        },
      },
    });
  }

  for (const familyMember of patientMocks.familyMemberMocks) {
    await prisma.familyMember.create({
      data: {
        firstName: familyMember.firstName,
        lastName: familyMember.lastName,
        age: familyMember.age,
        profilePictureUrl: familyMember.profilePictureUrl,
        description: familyMember.description,
        relation: familyMember.relation,
        patients: {
          connect: {
            id: parseInt(familyMember.patientId),
          },
        },
        phone: familyMember.phone,
        email: familyMember.email,
      },
    });
  }

  for (const accommodation of patientMocks.accommodationMocks) {
    await prisma.accommodation.create({
      data: {
        title: accommodation.title,
        patients: {
          connect: Object.keys(patientMocks.accommodationPatientMocks)
            .filter((key) => {
              return patientMocks.accommodationPatientMocks[key].includes(
                accommodation.id
              );
            })
            .map((key) => {
              return {
                id: parseInt(key),
              };
            }),
        },
      },
    });
  }

  await prisma.user.create({
    data: {
      email: authMocks.credentials.email,
      profilePictureUrl: authMocks.user.profilePictureUrl,
      password: await bcrypt.hash(
        authMocks.credentials.password,
        await bcrypt.genSalt(10)
      ),
      patients: {
        connect: (
          await prisma.patient.findMany({})
        )?.map((patient) => {
          return {
            id: patient.id,
          };
        }),
      },
    },
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
