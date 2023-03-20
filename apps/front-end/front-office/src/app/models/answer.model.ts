export class Answer {
  value: string;
  isCorrect: boolean;

  constructor(value: string, isCorrect: boolean) {
    this.value = value;
    this.isCorrect = isCorrect;
  }
}
