import React from 'react';
import { Users, Target, Clock } from 'lucide-react';
import { QuizResults } from '../../types/adminResults';

interface ResultsOverviewProps {
  results: QuizResults;
}

export function ResultsOverview({ results }: ResultsOverviewProps) {
  const averageScore = results.attempts.reduce((sum, attempt) => sum + attempt.score, 0) / results.attempts.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <Users className="h-8 w-8 text-indigo-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Participants</p>
            <p className="text-2xl font-semibold text-gray-900">{results.attempts.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <Target className="h-8 w-8 text-green-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Average Score</p>
            <p className="text-2xl font-semibold text-gray-900">{averageScore.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <Clock className="h-8 w-8 text-blue-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Last Attempt</p>
            <p className="text-2xl font-semibold text-gray-900">
              {new Date(results.attempts[0].created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}