import { Patient, Quiz } from '@webonjour/util-interface';

export const patientMocks: Patient.Patient[] = [
  {
    id: '1',
    firstName: 'Robert',
    lastName: 'TREBOR',
    age: 30,
    profilePictureUrl: 'https://cf.ozeliurs.com/tmp/rt.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc.',
    diseaseStage: Quiz.DiseaseStage.STAGE_3,
    lastQuizDate: new Date(),
    successRate: 0.5,
  },
  {
    id: '2',
    firstName: 'Marcelino',
    lastName: 'PAN Y VINO',
    age: 30,
    profilePictureUrl: 'https://cf.ozeliurs.com/tmp/mpyv.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc.',
    diseaseStage: Quiz.DiseaseStage.STAGE_4,
    lastQuizDate: new Date(),
    successRate: 0.8,
  },
  {
    id: '3',
    firstName: 'Maximinus',
    lastName: 'CALICLES',
    age: 30,
    profilePictureUrl: 'https://cf.ozeliurs.com/tmp/mc.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc.',
    diseaseStage: Quiz.DiseaseStage.STAGE_5,
    lastQuizDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    successRate: 0.2,
  },
  {
    id: '4',
    firstName: 'Olympicus',
    lastName: 'GYMNASIUM',
    age: 30,
    profilePictureUrl: 'https://cf.ozeliurs.com/tmp/og.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc.',
    diseaseStage: Quiz.DiseaseStage.STAGE_6,
    lastQuizDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    successRate: 0.2,
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
    title: 'Reposer la question de manière plus simple',
  },
  {
    id: '5',
    title: 'Reposer la question avec un contexte, ou un contexte different',
  },
  {
    id: '6',
    title: 'Taille de la police plus grande',
  },
  {
    id: '7',
    title: 'Affiche le score à la fin du quiz',
  },
];

export const accommodationPatientMocks: Record<string, string[]> = {
  '1': ['1', '2', '7'],
  '2': ['1', '2', '3'],
  '3': ['1', '2', '3', '4', '5', '6'],
  '4': ['1', '5', '6'],
};

export const patientQuizMocks: Record<string, string[]> = {
  '1': ['1', '2', '4'],
  '2': ['1', '2', '3'],
  '3': ['1', '2'],
  '4': ['1', '2'],
};
