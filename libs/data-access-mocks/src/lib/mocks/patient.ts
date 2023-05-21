import { Patient, Quiz } from '@webonjour/util-interface';

export const patientMocks: Patient.Patient[] = [
  {
    id: '1',
    firstName: 'Robert',
    lastName: 'TREBOR',
    age: 30,
    profilePictureUrl: 'https://cf.ozeliurs.com/tmp/rt.png',
    description: `
    Robert TREBOR, un homme retraité âgé de 75 ans ayant grandi à Valbonne (06) , est aujourd'hui veuf, sa femme Sophia étant décédée il y a 2 ans. Les deux enfants de Robert : Robespierre et Berbo TREBOR, ayant respectivement 38 et 43 ans se sont alors rapprochés géographiquement afin de s'occuper de lui.
Retraité et habile avec les machines, il enfile ses lunettes de lecture dès qu'il a du temps libre et passe son temps à apprendre à développer un jeu-vidéo, un de ses récents centres d'intérêts, et à écrire des articles en ligne afin de transmettre ses apprentissages sous formes de tutoriels. Robert aime également passer du temps sur sa tablette à jouer à Tetris, son jeu favori depuis ses jeunes années.
Robert est d'ailleurs un ancien ingénieur en informatique et diplômé d'un DUT informatique par l'IUT de Vélizy-Villacoublay. Il a donc depuis toujours eu une situation financière plutôt confortable.
Récemment, Robespierre et Berbo constatent chez leur père Robert des troubles de la mémoire, puisqu'il semble ne plus se souvenir de ce qu'il fait en leur absence, venant même à être incapable de retranscrire ce qu'il avait appris en développement de jeux-vidéos. Suite à des rendez-vous médicaux, le verdict est tombé, il s'agit des premiers symptômes d'Alzheimer. Face à cette nouvelle et ne sachant pas comment prendre correctement soin de leur père, ils décident de confier leur père à l'EHPAD "Au bel âge d'Anne-Marie".
En EHPAD, les animatrices proposent à Robert, commençant à se sentir isolé loin de ses fils et de sa maison, de jouer à PolyQuiz, permettant de divertir Robert, tout en stimulant sa mémoire afin de "ralentir" la dégradation de ses neurones.  Toujours à l'aise avec les applications informatiques et aimant les jeux-vidéos, cela lui permet de retrouver un peu du quotidien qu'il connaît.
    `,
    diseaseStage: Quiz.DiseaseStage.STAGE_3,
    lastQuizDate: new Date(),
    successRate: 0.5,
    floor: 1,
  },
  {
    id: '2',
    firstName: 'Marcelino',
    lastName: 'PAN Y VINO',
    age: 30,
    profilePictureUrl: 'https://cf.ozeliurs.com/tmp/mpyv.png',
    description: `
    Marcelino Pan Y Vino, 62 ans et ancien militaire français, a décidé en 2017 de venir vivre près de Vallauris (06) avec sa femme Maria, âgée de 57 ans. Ancien militaire aujourd'hui à la retraite, il a tout de même eu l'occasion d'avoir deux enfants avec Maria : Thomas et Vincente, deux hommes respectivement âgés de 30 et 33 ans.
Marcelino n'a obtenu qu'un niveau d'étude équivalent au baccaulauréat avant d'accéder à l'armée française, il a donc toujours eu une situation financière moyenne, lui permettant alors, avec l'aide de l'État, de subvenir largement à leurs besoins, sa femme n'ayant pas été longtemps dans le monde professionnel au cours de sa vie.
En Janvier 2023, Marcelino et sa femme apprennent qu'il est atteint depuis déjà quelques années de la maladie d'Alzheimer, et qu'il est aujourd'hui dans la phase de transition du stade 5 au stade 6 de la maladie. Effondrée, sa femme décide alors de le confier à des personnes qui pourront l'aider à essayer de mieux vivre avec sa maladie, le stade 5 marquant le début de la perte d'autonomie. C'est pourquoi elle le confie à une maison de retraite du coin, en partie financée par l'État.
Marcelino, autrefois passionné d'Histoire et du jeu d'échecs, perd peu à peu son autonomie et a besoin d'aide pour les tâches du quotidien et pour lui rappeler des choses importantes comme l'endroit où il se trouve ou encore son numéro de téléphone. Il nécessite alors un accompagnement de plus près.
Cependant, Marcelino a toujours le goût du jeu. C'est pourquoi durant son temps libre, accompagné par les animatrices, il se rend sur PolyQuiz afin de réaliser des quiz dans l'objectif de maintenir sa mémoire sur les choses du quotidien. Marcelino n'a pas l'habitude des tablettes et téléphones, il a donc du mal à comprendre comment fonctionne l'application. Heureusement, les animatrices sont là pour réexpliquer le fonctionnement de l'application et les différentes possibilités offertes par l'application dès lors qu'il ne s'en souvient plus.
`,
    diseaseStage: Quiz.DiseaseStage.STAGE_4,
    lastQuizDate: new Date(),
    successRate: 0.8,
    floor: 1,
  },
  {
    id: '3',
    firstName: 'Maximinus',
    lastName: 'CALICLES',
    age: 30,
    profilePictureUrl: 'https://cf.ozeliurs.com/tmp/mc.png',
    description:
      'Maximinus a des difficultés pour effectuer des tâches simples.',
    diseaseStage: Quiz.DiseaseStage.STAGE_5,
    lastQuizDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    successRate: 0.2,
    floor: 2,
  },
  {
    id: '4',
    firstName: 'Olympicus',
    lastName: 'GYMNASIUM',
    age: 30,
    profilePictureUrl: 'https://cf.ozeliurs.com/tmp/og.png',
    description: '',
    diseaseStage: Quiz.DiseaseStage.STAGE_6,
    lastQuizDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    successRate: 0.2,
    floor: 3,
  },
];

export const familyMemberMocks: Patient.FamilyMember[] = [
  {
    id: '1',
    firstName: 'John Jr.',
    lastName: 'Doe',
    age: 10,
    profilePictureUrl: 'https://picsum.photos/200',
    description: '',
    relation: 'Fils',
    patientId: '1',
    email: 'example@gamil.com',
    phone: '1234567890',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Doe',
    age: 30,
    profilePictureUrl: 'https://picsum.photos/200',
    description: '',
    relation: 'Fille',
    patientId: '1',
    email: 'xasqwe@gmail.com',
    phone: '1234567890',
  },
  {
    id: '3',
    firstName: 'Jean Jr.',
    lastName: 'Dode',
    age: 10,
    profilePictureUrl: 'https://picsum.photos/200',
    description: '',
    relation: 'Fils',
    patientId: '2',
    email: 'xasqwe@gmail.com',
    phone: '1234567890',
  },
  {
    id: '4',
    firstName: 'Jane',
    lastName: 'Dode',
    age: 30,
    profilePictureUrl: 'https://picsum.photos/200',
    description: '',
    relation: 'Fille',
    patientId: '2',
    email: 'xasqwe@gmail.com',
    phone: '1234567890',
  },
];

export const familyMemberPatientMocks: Record<string, string[]> = {
  '1': ['1', '2'],
  '2': ['3', '4'],
  '3': [],
  '4': [],
};

export const accommodationMocks: Patient.Accommodation[] = [
  {
    id: '1',
    title: 'Peut recommencer le quiz',
  },
  {
    id: '2',
    title: "Afficher les images en cas d'échec",
  },
  {
    id: '6',
    title: 'Taille de la police plus grande',
  },
  {
    id: '7',
    title: 'Affiche le score à la fin du quiz',
  },
  {
    id: '8',
    title: 'Peut répondre deux fois à la même question',
  },
  {
    id: '9',
    title: "Carte d'apprentissage",
  },
  {
    id: '10',
    title: 'Active le TTS (prononciation du texte)',
  },
];

export const accommodationPatientMocks: Record<string, string[]> = {
  '1': ['1', '2', '7'],
  '2': ['1', '2', '3', '8', '9'],
  '3': ['1', '2', '3', '4', '5', '6', '8', '9'],
  '4': ['1', '5', '6', '8', '9'],
};

export const patientQuizMocks: Record<string, string[]> = {
  '1': ['1', '2', '4'],
  '2': ['1', '2', '3'],
  '3': ['1', '2'],
  '4': ['1', '2'],
};
