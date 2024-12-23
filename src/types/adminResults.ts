export interface QuizResults {
  quiz: {
    id: string;
    name: string;
    code: string;
  };
  questions: Array<{
    id: string;
    text: string;
    type: 'single' | 'multiple';
    options: Array<{
      id: string;
      text: string;
      is_correct: boolean;
    }>;
  }>;
  attempts: Array<{
    id: string;
    player_name: string;
    score: number;
    created_at: string;
  }>;
  answers: Array<{
    id: string;
    attempt_id: string;
    question_id: string;
    selected_options: number[];
    is_correct: boolean;
  }>;
}