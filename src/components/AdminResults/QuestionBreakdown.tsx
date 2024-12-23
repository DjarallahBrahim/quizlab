import React, { useState } from 'react';
import { QuizResults } from '../../types/adminResults';
import { BarChart, CheckCircle, XCircle, User } from 'lucide-react';
import { UserSelect } from './UserSelect';

interface QuestionBreakdownProps {
  results: QuizResults;
}

export function QuestionBreakdown({ results }: QuestionBreakdownProps) {
  const [selectedAttemptId, setSelectedAttemptId] = useState<string | null>(null);

  const getQuestionStats = (questionId: string) => {
    const answers = results.answers.filter(a => {
      if (selectedAttemptId) {
        return a.question_id === questionId && a.attempt_id === selectedAttemptId;
      }
      return a.question_id === questionId;
    });

    const correctCount = answers.filter(a => a.is_correct).length;
    const incorrectCount = answers.length - correctCount;
    const correctPercentage = answers.length > 0 ? (correctCount / answers.length) * 100 : 0;

    return {
      correctCount,
      incorrectCount,
      correctPercentage,
      totalAnswers: answers.length
    };
  };

  const getUserAnswer = (questionId: string) => {
    if (!selectedAttemptId) return null;
    return results.answers.find(
      a => a.question_id === questionId && a.attempt_id === selectedAttemptId
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <BarChart className="w-6 h-6 mr-2" />
          Question Analysis
        </h3>
        <div className="w-64">
          <UserSelect
            users={results.attempts.map(a => ({ id: a.id, player_name: a.player_name }))}
            selectedUserId={selectedAttemptId}
            onSelectUser={setSelectedAttemptId}
          />
        </div>
      </div>

      <div className="space-y-4">
        {results.questions.map((question, index) => {
          const stats = getQuestionStats(question.id);
          const userAnswer = getUserAnswer(question.id);

          return (
            <div key={question.id} className="bg-white rounded-lg shadow p-6">
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-900">
                  Question {index + 1}: {question.text}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">
                    Correct: {stats.correctCount} ({stats.correctPercentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-gray-600">
                    Incorrect: {stats.incorrectCount}
                  </span>
                </div>
              </div>

              {userAnswer && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Selected Answer</h5>
                  <div className={`text-sm ${userAnswer.is_correct ? 'text-green-600' : 'text-red-600'}`}>
                    {question.options
                      .filter((_, index) => userAnswer.selected_options.includes(index))
                      .map(opt => opt.text)
                      .join(', ')}
                  </div>
                  {!userAnswer.is_correct && (
                    <div className="mt-2">
                      <div className="text-sm font-medium text-gray-900">Correct Answer</div>
                      <div className="text-sm text-green-600">
                        {question.options
                          .filter(opt => opt.is_correct)
                          .map(opt => opt.text)
                          .join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="relative pt-4">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${stats.correctPercentage}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Based on {stats.totalAnswers} answer{stats.totalAnswers !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}