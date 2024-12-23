export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswers: number[];
  type: 'single' | 'multiple';
}

export interface Quiz {
  id: string;
  name: string;
  code: string;
  questions: Question[];
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: QuizOption[];
  order_number: number;
}

export interface QuizOption {
  id: string;
  text: string;
  is_correct: boolean;
  order_number: number;
}

export interface QuizData {
  id: string;
  name: string;
  code: string;
  questions: QuizQuestion[];
}