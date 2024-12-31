import React from 'react';
import { QuestionPreview } from '../QuestionPreview';
import { Question } from '../../types/quiz';

interface PreviewWidgetProps {
  questions: Question[];
  onDelete: (id: string) => void;
}

export function PreviewWidget({ questions, onDelete }: PreviewWidgetProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Questions Preview</h3>
        <p className="text-sm text-gray-500 mt-1">
          {questions.length} question{questions.length !== 1 ? 's' : ''} added
        </p>
      </div>
      <QuestionPreview 
        questions={questions} 
        onDelete={onDelete} 
      />
    </div>
  );
}