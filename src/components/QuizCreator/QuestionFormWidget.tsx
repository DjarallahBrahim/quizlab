import React from 'react';
import { QuestionForm } from '../QuestionForm';
import { Question } from '../../types/quiz';

interface QuestionFormWidgetProps {
  onAddQuestion: (question: Question) => void;
}

export function QuestionFormWidget({ onAddQuestion }: QuestionFormWidgetProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24 h-fit">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Create Question</h3>
        <p className="text-sm text-gray-500 mt-1">
          Add questions and define correct answers
        </p>
      </div>
      <QuestionForm onSubmit={onAddQuestion} />
    </div>
  );
}