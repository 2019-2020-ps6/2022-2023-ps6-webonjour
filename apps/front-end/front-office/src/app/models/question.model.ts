import {Answer} from "./answer.model";

export class Question {
  title: string;
  answers: Answer[];

  constructor(title: string, answers: Answer[]) {
    this.title = title;
    this.answers = answers;
  }
}
