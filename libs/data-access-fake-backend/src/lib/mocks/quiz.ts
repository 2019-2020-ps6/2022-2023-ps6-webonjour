import { Quiz } from '@webonjour/util-interface';

export const quizList: Quiz.Quiz[] = [
  {
    id: '1',
    title: 'Les chevaux célèbres',
    imageUrl: 'https://cf.ozeliurs.com/tmp/horse.png',
    stage: Quiz.DiseaseStage.STAGE_3,
    isPrivate: false,
    questions: [
      {
        id: '1',
        title: "Quelle était la couleur du cheval blanc d'Henri IV ?",
        type: Quiz.QuestionType.CHOICE,
        answers: [
          {
            text: 'Blanc',
            image: 'https://cf.ozeliurs.com/tmp/white.png',
            isCorrect: true,
          },
          {
            text: 'Noir',
            image: 'https://cf.ozeliurs.com/tmp/black.png',
            isCorrect: false,
          },
          {
            text: 'Rouge',
            image: 'https://cf.ozeliurs.com/tmp/red.png',
            isCorrect: false,
          },
          {
            text: 'Vert',
            image: 'https://cf.ozeliurs.com/tmp/green.png',
            isCorrect: false,
          },
        ],
        clues: [
          { text: "C'est la couleur de la neige" },
          {
            text: 'Ce cheval était connu pour sa robe blanche et son allure majestueuse.',
          },
          {
            text: "Cette couleur ne fait pas partie de l'arc-en-ciel mais en est la combinaison.",
          },
          {
            image: 'https://cf.ozeliurs.com/tmp/white-horse.webp',
          },
        ],
      },
      {
        id: '2',
        title: 'Quel était le nom du cheval de Napoléon Bonaparte ?',
        type: Quiz.QuestionType.CHOICE,
        answers: [
          {
            text: 'Marengo',
            isCorrect: true,
          },
          {
            text: 'Roquette',
            isCorrect: false,
          },
          {
            text: 'Jappeloup',
            isCorrect: false,
          },
        ],
        clues: [
          {
            text: "Le nom de ce cheval vient d'une bataille qui a eu lieu en 1800.",
          },
        ],
      },
      {
        id: '3',
        title: "Comment s'appelait le cheval de Zorro ?",
        type: Quiz.QuestionType.CHOICE,
        answers: [
          {
            text: 'Tornado',
            isCorrect: true,
          },
          {
            text: 'Apache',
            isCorrect: false,
          },
          {
            text: 'Faucon',
            isCorrect: false,
          },
        ],
        clues: [
          { text: 'Ce cheval était connu pour sa robe noire et blanche.' },
        ],
      },
      {
        id: '4',
        title: 'Quel était le nom du cheval de la reine Élisabeth II ?',
        type: Quiz.QuestionType.CHOICE,
        answers: [
          {
            text: 'Estimate',
            isCorrect: false,
          },
          {
            text: 'Highclere',
            isCorrect: false,
          },
          {
            text: 'Burmese',
            isCorrect: true,
          },
        ],
        clues: [
          {
            text: "Ce cheval a été offert à la reine Élisabeth II par l'armée australienne.",
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Quiz sur les Templiers',
    imageUrl: 'https://cf.ozeliurs.com/tmp/temp.png',
    stage: Quiz.DiseaseStage.STAGE_4,
    isPrivate: false,
    questions: [
      {
        id: '1',
        title: 'Quelle était la mission initiale des Templiers ?',
        type: Quiz.QuestionType.CHOICE,
        answers: [
          {
            text: 'Protéger les pèlerins chrétiens en Terre Sainte',
            isCorrect: true,
          },
          {
            text: 'Protéger les routes commerciales en Europe',
            isCorrect: false,
          },
          {
            text: "Défendre les intérêts de l'Église catholique",
            isCorrect: false,
          },
        ],
        clues: [
          {
            text: 'Ils ont été créés en 1119 pour protéger les pèlerins qui se rendaient en Terre Sainte.',
          },
        ],
      },
      {
        id: '2',
        title: 'Quel était le symbole des Templiers ?',
        type: Quiz.QuestionType.CHOICE,
        answers: [
          {
            text: 'La croix pattée',
            isCorrect: true,
          },
          {
            text: 'La croix de Malte',
            isCorrect: false,
          },
          {
            text: 'La croix de Saint-André',
            isCorrect: false,
          },
        ],
        clues: [
          {
            text: 'Leur symbole était aussi appelée croix de Jérusalem.',
          },
        ],
      },
      {
        id: '3',
        title:
          'Quelle est la raison principale pour laquelle les Templiers ont été persécutés et dissous en 1312 ?',
        type: Quiz.QuestionType.CHOICE,
        answers: [
          {
            text: "Ils étaient accusés d'hérésie et d'autres crimes",
            isCorrect: true,
          },
          {
            text: 'Ils étaient devenus trop puissants et menaçaient les rois européens',
            isCorrect: false,
          },
          {
            text: "Ils avaient refusé d'obéir aux ordres du pape",
            isCorrect: false,
          },
        ],
        clues: [
          {
            text: 'Le roi de France Philippe IV a lancé une campagne pour les faire arrêter et a obtenu leur dissolution par le pape Clément V en 1312.',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Quiz autobiographique de Marcelino',
    imageUrl: 'https://cf.ozeliurs.com/tmp/person.png',
    stage: Quiz.DiseaseStage.STAGE_4,
    isPrivate: true,
    questions: [
      {
        id: '1',
        title: 'Quel est le nom de mon premier chien ?',
        type: Quiz.QuestionType.CHOICE,
        answers: [
          {
            text: 'Rex',
            isCorrect: true,
          },
          {
            text: 'Ramses',
            isCorrect: false,
          },
          {
            text: 'Rudolph',
            isCorrect: false,
          },
        ],
        clues: [
          {
            text: 'Ça commence par R',
          },
        ],
      },
      {
        id: '2',
        title: 'Quel est le prénom de votre fille ?',
        type: Quiz.QuestionType.CHOICE,
        answers: [
          {
            text: 'Marcela',
            isCorrect: true,
          },
          {
            text: 'Marion',
            isCorrect: false,
          },
          {
            text: 'Maurice',
            isCorrect: false,
          },
        ],
        clues: [
          {
            text: 'Ça commence par M',
          },
        ],
      },
      {
        id: '3',
        title: 'Quelle était la couleur de votre première voiture ?',
        type: Quiz.QuestionType.CHOICE,
        answers: [
          {
            text: 'Rouge',
            isCorrect: true,
          },
          {
            text: 'Verte',
            isCorrect: false,
          },
          {
            text: 'Bleue',
            isCorrect: false,
          },
        ],
        clues: [
          {
            text: 'Ça commence par R',
          },
        ],
      },
      {
        id: '4',
        title: 'À quoi ressemble votre maison ?',
        type: Quiz.QuestionType.CHOICE,
        answers: [
          {
            image: 'https://cf.ozeliurs.com/tmp/house1.png',
            isCorrect: true,
          },
          {
            image: 'https://cf.ozeliurs.com/tmp/house2.png',
            isCorrect: false,
          },
          {
            image: 'https://cf.ozeliurs.com/tmp/house3.png',
            isCorrect: false,
          },
        ],
        clues: [
          {
            text: 'Ça commence par R',
          },
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'Actions du quotidien',
    imageUrl: 'https://cf.ozeliurs.com/tmp/person.png',
    stage: Quiz.DiseaseStage.STAGE_4,
    isPrivate: true,
    questions: [
      {
        id: '1',
        title: "Réordonner par ordre logique pour s'habiller",
        type: Quiz.QuestionType.REORDER,
        answers: [
          {
            text: 'Mettre le slip',
            isCorrect: false,
          },
          {
            text: 'Mettre le pantalon et le t-shirt',
            isCorrect: false,
          },
          {
            text: 'Mettre les chaussettes',
            isCorrect: false,
          },
          {
            text: 'Mettre les chaussures',
            isCorrect: false,
          },
        ],
        clues: [],
      },
      {
        id: '2',
        title: 'Réordonner par ordre logique pour faire des pâtes.',
        type: Quiz.QuestionType.REORDER,
        answers: [
          {
            text: 'Prendre une casserole',
            isCorrect: false,
          },
          {
            text: "Mettre de l'eau à bouillir",
            isCorrect: false,
          },
          {
            text: "Mettre les pâtes dans l'eau",
            isCorrect: true,
          },
          {
            text: 'Égoutter les pâtes',
            isCorrect: false,
          },
          {
            text: 'Servir dans une assiette',
            isCorrect: false,
          },
          {
            text: 'Mettre de la sauce tomate',
            isCorrect: false,
          },
        ],
        clues: [],
      },
    ],
  },
];
