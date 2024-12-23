import React, { useState, useEffect, useRef } from 'react';
import { QuizQuestion } from '../../types/quiz';

interface QuestionViewProps {
  question: QuizQuestion;
  onAnswer: (selectedOptions: number[]) => void;
}

export function QuestionView({ question, onAnswer }: QuestionViewProps) {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const onAnswerRef = useRef(onAnswer);

  // Update ref when onAnswer changes
  useEffect(() => {
    onAnswerRef.current = onAnswer;
  }, [onAnswer]);

  // Reset selected options when question changes
  useEffect(() => {
    setSelectedOptions([]);
    onAnswerRef.current([]);
  }, [question.id]); // Remove onAnswer from dependencies

  const handleOptionChange = (optionIndex: number) => {
    let newSelected: number[];
    
    if (question.type === 'single') {
      newSelected = [optionIndex];
    } else {
      newSelected = selectedOptions.includes(optionIndex)
        ? selectedOptions.filter(i => i !== optionIndex)
        : [...selectedOptions, optionIndex];
    }
    
    setSelectedOptions(newSelected);
    onAnswerRef.current(newSelected);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium text-gray-900">{question.text}</h3>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <label
            key={option.id}
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer"
          >
            <input
              type={question.type === 'single' ? 'radio' : 'checkbox'}
              checked={selectedOptions.includes(index)}
              onChange={() => handleOptionChange(index)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-3">{option.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}