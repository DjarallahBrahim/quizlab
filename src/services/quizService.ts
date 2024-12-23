import { supabase } from '../lib/supabase';
import { Quiz, QuizData } from '../types/quiz';

export async function saveQuiz(quiz: Quiz) {
  try {
    // Insert the quiz
    const { data: quizData, error: quizError } = await supabase
      .from('quizzes')
      .insert({ name: quiz.name, code: quiz.code })
      .select()
      .single();

    if (quizError) throw quizError;

    // Insert questions with their options
    for (const [index, question] of quiz.questions.entries()) {
      // Insert question
      const { data: questionData, error: questionError } = await supabase
        .from('questions')
        .insert({
          quiz_id: quizData.id,
          text: question.text,
          type: question.type,
          order_number: index
        })
        .select()
        .single();

      if (questionError) throw questionError;

      // Insert options for the question
      const optionsToInsert = question.options.map((text, optIndex) => ({
        question_id: questionData.id,
        text,
        is_correct: question.correctAnswers.includes(optIndex),
        order_number: optIndex
      }));

      const { error: optionsError } = await supabase
        .from('options')
        .insert(optionsToInsert);

      if (optionsError) throw optionsError;
    }

    return quizData;
  } catch (error) {
    console.error('Error saving quiz:', error);
    throw error;
  }
}

export async function deleteQuiz(quizId: string) {
  try {
    const { error } = await supabase
      .from('quizzes')
      .delete()
      .eq('id', quizId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting quiz:', error);
    throw error;
  }
}

export async function getQuizByCode(code: string): Promise<QuizData | null> {
  try {
    // Get quiz
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('*')
      .eq('code', code)
      .single();

    if (quizError) throw quizError;
    if (!quiz) return null;

    // Get questions
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select(`
        *,
        options (*)
      `)
      .eq('quiz_id', quiz.id)
      .order('order_number');

    if (questionsError) throw questionsError;

    return {
      ...quiz,
      questions: questions || []
    };
  } catch (error) {
    console.error('Error fetching quiz:', error);
    throw error;
  }
}