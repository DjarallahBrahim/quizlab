import React, { useState } from 'react';
import { format } from 'date-fns';
import { BarChart2, Trash2 } from 'lucide-react';
import { DeleteQuizModal } from './DeleteQuizModal';

interface Quiz {
  id: string;
  name: string;
  code: string;
  created_at: string;
}

interface QuizListProps {
  quizzes: Quiz[];
  onSelectQuiz: (quizId: string) => void;
  onDeleteQuiz: (quizId: string) => void;
  isLoading: boolean;
}

export function QuizList({ quizzes, onSelectQuiz, onDeleteQuiz, isLoading }: QuizListProps) {
  const [quizToDelete, setQuizToDelete] = useState<Quiz | null>(null);

  const handleDeleteClick = (quiz: Quiz) => {
    setQuizToDelete(quiz);
  };

  const handleConfirmDelete = async () => {
    if (quizToDelete) {
      await onDeleteQuiz(quizToDelete.id);
      setQuizToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading quizzes...</p>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No quizzes found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quiz Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quizzes.map((quiz) => (
              <tr key={quiz.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{quiz.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{quiz.code}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {format(new Date(quiz.created_at), 'MMM d, yyyy')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col items-center space-y-2">
                    <button
                      onClick={() => onSelectQuiz(quiz.id)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors group relative"
                      aria-label="View Results"
                    >
                      <BarChart2 className="w-5 h-5" />
                      <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        View Results
                      </span>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(quiz)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors group relative"
                      aria-label="Delete Quiz"
                    >
                      <Trash2 className="w-5 h-5" />
                      <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Delete Quiz
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteQuizModal
        quiz={quizToDelete}
        onClose={() => setQuizToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}