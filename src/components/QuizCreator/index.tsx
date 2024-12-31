import React, { memo } from 'react';
import { Question } from '../../types/quiz';
import { QuestionFormWidget } from './QuestionFormWidget';
import { PreviewWidget } from './PreviewWidget';

interface QuizCreatorProps {
  questions: Question[];
  onAddQuestion: (question: Question) => void;
  onDeleteQuestion: (id: string) => void;
}

export const QuizCreator = memo(function QuizCreator({ 
  questions, 
  onAddQuestion, 
  onDeleteQuestion 
}: QuizCreatorProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-transparent">
      <QuestionFormWidget onAddQuestion={onAddQuestion} />
      <PreviewWidget 
        questions={questions} 
        onDelete={onDeleteQuestion} 
      />
    </div>
  );
});