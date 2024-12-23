import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { QuizResults } from '../types/adminResults';

export function useQuizResults(quizCode: string) {
  const [results, setResults] = useState<QuizResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResults() {
      if (!quizCode) {
        setResults(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Get quiz details
        const { data: quiz, error: quizError } = await supabase
          .from('quizzes')
          .select('*')
          .eq('code', quizCode)
          .single();

        if (quizError) throw new Error('Quiz not found');

        // Get questions
        const { data: questions, error: questionsError } = await supabase
          .from('questions')
          .select('*, options(*)')
          .eq('quiz_id', quiz.id)
          .order('order_number');

        if (questionsError) throw questionsError;

        // Get attempts and answers
        const { data: attempts, error: attemptsError } = await supabase
          .from('quiz_attempts')
          .select('*')
          .eq('quiz_id', quiz.id)
          .order('created_at', { ascending: false });

        if (attemptsError) throw attemptsError;

        if (attempts.length === 0) {
          setResults(null);
          return;
        }

        const { data: answers, error: answersError } = await supabase
          .from('quiz_answers')
          .select('*')
          .in('attempt_id', attempts.map(a => a.id));

        if (answersError) throw answersError;

        setResults({
          quiz,
          questions,
          attempts,
          answers: answers || []
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load quiz results');
        setResults(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchResults();
  }, [quizCode]);

  return { results, isLoading, error };
}