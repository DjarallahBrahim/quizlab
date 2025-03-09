import React from 'react';
import { Sparkles } from 'lucide-react';
import { QuestionForm } from '../QuestionForm';
import { Question } from '../../types/quiz';

interface QuestionFormWidgetProps {
  onAddQuestion: (question: Question) => void;
  onAIAssist: () => void;
}

export function QuestionFormWidget({ onAddQuestion, onAIAssist }: QuestionFormWidgetProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24 h-fit">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Create Question</h3>
          <p className="text-sm text-gray-500 mt-1">
            Add questions and define correct answers
          </p>
        </div>
        <button
          onClick={onAIAssist}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <Sparkles className="w-4 h-4 mr-1" />
          Use AI
        </button>
      </div>
      <QuestionForm onSubmit={onAddQuestion} />
    </div>
  );
}