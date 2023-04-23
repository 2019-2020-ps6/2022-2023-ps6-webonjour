import { Quiz } from '@webonjour/util-interface';

export const quizList: Quiz.Quiz[] = [
  {
    id: '1',
    title: 'Les chevaux célèbres',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Horse_%284159728870%29.jpg/207px-Horse_%284159728870%29.jpg',
    stage: Quiz.DiseaseStage.STAGE_3,
    questions: [
      {
        title: "Quel était la couleur du cheval blanc d'Henri IV ?",
        type: Quiz.QuestionType.CHOICE,
        answers: [
          {
            text: 'Blanc',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/512px-Solid_white.svg.png',
            isCorrect: true,
          },
          {
            text: 'Noir',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/512px-Solid_black.svg.png',
            isCorrect: false,
          },
          {
            text: 'Rouge',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Solid_red.svg/512px-Solid_red.svg.png',
            isCorrect: false,
          },
          {
            text: 'Vert',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Solid_green.svg/512px-Solid_green.svg.png',
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
            image:
              'https://i0.wp.com/passionchateau.fr/wp-content/uploads/2015/01/77-5-Fraise-Mauzaisse-Henri-IV.jpg',
          },
        ],
      },
      {
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
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/2/24/Abraxas_Artistic_representationi.jpg',
    stage: Quiz.DiseaseStage.STAGE_4,
    questions: [
      {
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
            text: 'Leur symbole était la croix pattée, appelée aussi croix de Jérusalem.',
          },
        ],
      },
      {
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
    imageUrl:
      'https://cdn4.iconfinder.com/data/icons/user-people-2/48/6-512.png',
    stage: Quiz.DiseaseStage.STAGE_4,
    questions: [
      {
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
            text: 'Ca commence par R',
          },
        ],
      },
      {
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
            text: 'Ca commence par M',
          },
        ],
      },
      {
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
            text: 'Ca commence par R',
          },
        ],
      },
      {
        title: 'A quoi ressemble votre maison ?',
        type: Quiz.QuestionType.CHOICE,
        answers: [
          {
            image:
              'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.xR4aEMBVqQ58YhNZsu2w3wHaEu%26pid%3DApi&f=1&ipt=f6eb3ce7363d3a0f4567593fbfbeda97cb2d4416efd1e5f599ca78e0dc067d02&ipo=images',
            isCorrect: true,
          },
          {
            image:
              'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.xcZZ6O4BH2xaGmA55md6dAHaHa%26pid%3DApi&f=1&ipt=12cd54c9f28ed22500d71a4a41f0c58d1282e9d3bb7e740fa67d19abdf1f03cf&ipo=images',
            isCorrect: false,
          },
          {
            image:
              'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.hNnTtcmM9AZ8dgRs0zksNwHaHe%26pid%3DApi&f=1&ipt=b6b100038c7fa259cbf0f7eb48c9362eb3686cb4839d926f16845d8ff133d490&ipo=images',
            isCorrect: false,
          },
        ],
        clues: [
          {
            text: 'Ca commence par R',
          },
        ],
      },
    ],
  },
];
