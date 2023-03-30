import { Quiz } from '@webonjour/util-interface';

export const quizList: Quiz.Quiz[] = [
  {
    id: '1',
    title: 'Quiz 1',
    imageUrl: 'https://picsum.photos/200',
    stage: Quiz.DiseaseStage.STAGE_1,
    questions: [
      {
        title: 'Question 1',
        answers: [
          {
            text: 'Answer 1',
            isCorrect: true,
          },
          {
            text: 'Answer 2',
            isCorrect: false,
          },
          {
            text: 'Answer 3',
            isCorrect: false,
          },
        ],
        clues: [],
      },
      {
        title: 'Question 2',
        answers: [
          {
            text: 'Answer 1',
            isCorrect: false,
          },
          {
            text: 'Answer 2',
            isCorrect: true,
          },
          {
            text: 'Answer 3',
            isCorrect: false,
          },
        ],
        clues: [],
      },
    ],
  },
  {
    id: '2',
    title: 'Quiz 2',
    imageUrl: 'https://picsum.photos/200',
    stage: Quiz.DiseaseStage.STAGE_2,
    questions: [
      {
        title: 'Question 1',
        answers: [
          {
            text: 'Answer 1',
            isCorrect: true,
          },
          {
            text: 'Answer 2',
            isCorrect: false,
          },
          {
            text: 'Answer 3',
            isCorrect: false,
          },
        ],
        clues: [],
      },
      {
        title: 'Question 2',
        answers: [
          {
            text: 'Answer 1',
            isCorrect: false,
          },
          {
            text: 'Answer 2',
            isCorrect: true,
          },
          {
            text: 'Answer 3',
            isCorrect: false,
          },
        ],
        clues: [],
      },
    ],
  },
];
