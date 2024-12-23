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
  const handleAddQuestion = (questionData: Omit<Question, 'id'>) => {
    onAddQuestion({
      id: crypto.randomUUID(),
      ...questionData
    });
  };

  return (
    <div className="flex gap-8">
      <div className="w-1/2">
        <QuestionForm onSubmit={handleAddQuestion} />
      </div>
      <div className="w-1/2">
        <QuestionPreview 
          questions={questions} 
          onDelete={onDeleteQuestion} 
        />
      </div>
    </div>
  );
}