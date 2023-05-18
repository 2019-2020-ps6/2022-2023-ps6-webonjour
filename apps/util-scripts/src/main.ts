import { PrismaClient } from '@prisma/client';
import { quizMocks } from '@webonjour/data-access-mocks';

const prisma = new PrismaClient();

export async function main() {
  for (const quiz of quizMocks.quizList) {
    await prisma.quiz.create({
      data: {
        title: quiz.title,
        stage: quiz.stage,
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
}

main().then(() => {
  console.log('Success');
});
