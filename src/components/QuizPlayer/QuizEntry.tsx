import React, { useState } from 'react';
import { getQuizByCode } from '../../services/quizService';

interface QuizEntryProps {
  onStartQuiz: (quizData: any, playerName: string) => void;
}

export function QuizEntry({ onStartQuiz }: QuizEntryProps) {
  const [playerName, setPlayerName] = useState('');
  const [quizCode, setQuizCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const quizData = await getQuizByCode(quizCode.toUpperCase());
      if (!quizData) {
        setError('Quiz not found. Please check the code and try again.');
        return;
      }
      onStartQuiz(quizData, playerName);
    } catch (err) {
      setError('Failed to load quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="playerName" className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            id="playerName"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white p-2"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label htmlFor="quizCode" className="block text-sm font-medium text-gray-700">
            Quiz Code
          </label>
          <input
            type="text"
            id="quizCode"
            value={quizCode}
            onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white p-2"
            placeholder="Enter quiz code"
            maxLength={6}
            required
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Start Quiz'}
        </button>
      </form>
    </div>
  );
}