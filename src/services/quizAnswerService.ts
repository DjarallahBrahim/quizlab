import { supabase } from '../lib/supabase';
import { QuizData } from '../types/quiz';

interface SaveQuizAnswersParams {
  quizId: string;
  playerName: string;
  score: number;
  answers: Record<string, {
    selectedOptions: number[];
    isCorrect: boolean;
  }>;
}

export async function saveQuizAnswers({
  quizId,
  playerName,
  score,
  answers
}: SaveQuizAnswersParams) {
  try {
    // Create quiz attempt
    const { data: attempt, error: attemptError } = await supabase
      .from('quiz_attempts')
      .insert({
        quiz_id: quizId,
        player_name: playerName,
        score: score
      })
      .select()
      .single();

    if (attemptError) throw attemptError;

    // Create answers
    const answersToInsert = Object.entries(answers).map(([questionId, answer]) => ({
      attempt_id: attempt.id,
      question_id: questionId,
      selected_options: answer.selectedOptions,
      is_correct: answer.isCorrect
    }));

    const { error: answersError } = await supabase
      .from('quiz_answers')
      .insert(answersToInsert);

    if (answersError) throw answersError;

    return attempt;
  } catch (error) {
    console.error('Error saving quiz answers:', error);
    throw error;
  }
}