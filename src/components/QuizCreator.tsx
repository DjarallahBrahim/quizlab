import React from 'react';
import { Question } from '../types/quiz';
import { QuestionForm } from './QuestionForm';
import { QuestionPreview } from './QuestionPreview';

interface QuizCreatorProps {
  questions: Question[];
  onAddQuestion: (question: Question) => void;
  onDeleteQuestion: (id: string) => void;
}

export function QuizCreator({ questions, onAddQuestion, onDeleteQuestion }: QuizCreatorProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-transparent">
      {/* Question Form Widget */}
      <div className="bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24 h-fit">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Create Question</h3>
          <p className="text-sm text-gray-500 mt-1">
            Add questions and define correct answers
          </p>
        </div>
        <QuestionForm onSubmit={onAddQuestion} />
      </div>

      {/* Questions Preview Widget */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Questions Preview</h3>
          <p className="text-sm text-gray-500 mt-1">
            {questions.length} question{questions.length !== 1 ? 's' : ''} added
          </p>
        </div>
        <QuestionPreview 
          questions={questions} 
          onDelete={onDeleteQuestion} 
        />
      </div>
    </div>
  );
}