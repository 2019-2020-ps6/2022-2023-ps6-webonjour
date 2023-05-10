import { Patient, Quiz } from '@webonjour/util-interface';

export const patientMocks: Patient.Patient[] = [
  {
    id: '1',
    firstName: 'Robert',
    lastName: 'TREBOR',
    age: 30,
    profilePictureUrl: 'https://cf.ozeliurs.com/tmp/rt.png',
    description: 'Robert est au début de la maladie.',
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
    description:
      'Marcelino est assez avancé dans la maladie. Il a des difficultés prononcées pour se rappeler des choses.',
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
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc.',
    relation: 'Son',
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
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc.',
    relation: 'Daughter',
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
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc.',
    relation: 'Son',
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
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc.',
    relation: 'Daughter',
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
