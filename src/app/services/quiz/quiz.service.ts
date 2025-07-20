import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  masterSettings = {
    questionsMaxLimit: 500,
    correctAnswerPoint: 1.0,
    wrongAnswerPoint: -0.25,
    defaultTiming: '00:02',
  }

  constructor() { }

  fetchQuestions(formValue: { 
    question_count: number, 
    category_id: string,
    duration: any
  }) {
    return[];
  }
}
