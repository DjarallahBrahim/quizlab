import React, { memo, useState } from 'react';
import { Question } from '../../types/quiz';
import { QuestionFormWidget } from './QuestionFormWidget';
import { PreviewWidget } from './PreviewWidget';
import { AIAssistant } from '../AI/AIAssistant';
import { GeneratedQuestion } from '../../services/aiService';

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
  const [isAIAssistantVisible, setIsAIAssistantVisible] = useState(false);

  const handleQuestionsGenerated = (generatedQuestions: GeneratedQuestion[]) => {
    generatedQuestions.forEach(q => {
      const question: Question = {
        id: crypto.randomUUID(),
        text: q.text,
        options: q.options,
        correctAnswers: q.correctAnswers,
        type: q.type
      };
      onAddQuestion(question);
    });
    setIsAIAssistantVisible(false);
  };

  const handleAIAssist = () => {
    setIsAIAssistantVisible(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-transparent">
        <QuestionFormWidget 
          onAddQuestion={onAddQuestion}
          onAIAssist={handleAIAssist}
        />
        <PreviewWidget 
          questions={questions} 
          onDelete={onDeleteQuestion} 
        />
      </div>

      <AIAssistant
        isVisible={isAIAssistantVisible}
        onClose={() => setIsAIAssistantVisible(false)}
        onQuestionsGenerated={handleQuestionsGenerated}
      />
    </>
  );
});