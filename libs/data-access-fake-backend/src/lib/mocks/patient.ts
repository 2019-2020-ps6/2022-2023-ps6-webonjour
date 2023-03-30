import { Patient, Quiz } from '@webonjour/util-interface';

export const patientMocks: Patient.Patient[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    profilePictureUrl: 'https://picsum.photos/200',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc.',
    diseaseStage: Quiz.DiseaseStage.STAGE_1,
    lastQuizDate: new Date(),
    successRate: 0.5,
  },
  {
    id: '2',
    firstName: 'Jean',
    lastName: 'Dode',
    age: 30,
    profilePictureUrl: 'https://picsum.photos/200',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc.',
    diseaseStage: Quiz.DiseaseStage.STAGE_2,
    lastQuizDate: new Date(),
    successRate: 0.8,
  },
  {
    id: '3',
    firstName: 'Jack',
    lastName: 'Daniels',
    age: 30,
    profilePictureUrl: 'https://picsum.photos/200',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc.',
    diseaseStage: Quiz.DiseaseStage.STAGE_3,
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
    title: 'Accommodation 1',
  },
  {
    id: '2',
    title: 'Accommodation 2',
  },
  {
    id: '3',
    title: 'Accommodation 3',
  },
  {
    id: '4',
    title: 'Accommodation 4',
  },
];

export const accommodationPatientMocks: Record<string, string[]> = {
  '1': ['1', '2'],
  '2': ['1', '2', '3'],
  '3': ['1', '2', '3', '4'],
};

export const patientQuizMocks: Record<string, string[]> = {
  '1': ['1', '2', '3'],
  '2': ['1', '2', '3'],
  '3': ['1', '2', '3'],
  '4': ['1', '2', '3'],
};
