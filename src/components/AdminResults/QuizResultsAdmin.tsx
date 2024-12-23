import React, { useState } from 'react';
import { useQuizList } from '../../hooks/useQuizList';
import { ResultsOverview } from './ResultsOverview';
import { QuestionBreakdown } from './QuestionBreakdown';
import { QuizList } from './QuizList';
import { useNotification } from '../Notification/NotificationContext';
import { deleteQuiz } from '../../services/quizService';

export function QuizResultsAdmin() {
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const { quizzes, results, isLoading, error, refreshQuizzes } = useQuizList(selectedQuizId);
  const { showNotification } = useNotification();

  const handleQuizSelect = (quizId: string) => {
    setSelectedQuizId(quizId);
  };

  const handleDeleteQuiz = async (quizId: string) => {
    try {
      await deleteQuiz(quizId);
      showNotification('Quiz deleted successfully', 'success');
      if (selectedQuizId === quizId) {
        setSelectedQuizId(null);
      }
      refreshQuizzes();
    } catch (error) {
      showNotification('Failed to delete quiz', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Quiz Results
        </h1>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8">
          {!selectedQuizId ? (
            <QuizList 
              quizzes={quizzes} 
              onSelectQuiz={handleQuizSelect}
              onDeleteQuiz={handleDeleteQuiz}
              isLoading={isLoading}
            />
          ) : (
            <>
              <button
                onClick={() => setSelectedQuizId(null)}
                className="mb-6 text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                ← Back to Quiz List
              </button>

              {isLoading && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading quiz results...</p>
                </div>
              )}

              {error && (
                <div className="text-center py-12">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {results && (
                <div className="mt-8 space-y-8">
                  <ResultsOverview results={results} />
                  <QuestionBreakdown results={results} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}