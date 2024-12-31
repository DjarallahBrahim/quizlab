import React, { useState } from 'react';
import { Trash2, ChevronDown, ChevronUp, CheckCircle, XCircle } from 'lucide-react';
import { Question } from '../types/quiz';

interface QuestionPreviewProps {
  questions: Question[];
  onDelete: (id: string) => void;
}

export function QuestionPreview({ questions, onDelete }: QuestionPreviewProps) {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No questions added yet</p>
        <p className="text-sm text-gray-400 mt-1">Questions will appear here as you add them</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div 
          key={question.id} 
          className="bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100"
        >
          <div className="p-4">
            <div className="flex justify-between items-start">
              <button
                onClick={() => toggleQuestion(question.id)}
                className="flex-1 flex items-center text-left"
              >
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mr-2">
                      {index + 1}
                    </span>
                    <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                      {question.type === 'single' ? 'Single Answer' : 'Multiple Answers'}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-900">{question.text}</p>
                </div>
                {expandedQuestion === question.id ? (
                  <ChevronUp className="ml-2 w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="ml-2 w-5 h-5 text-gray-400" />
                )}
              </button>
              <button
                onClick={() => onDelete(question.id)}
                className="ml-4 p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-200"
                title="Delete question"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {expandedQuestion === question.id && (
              <div className="mt-4 pl-8 border-l-2 border-indigo-100">
                <div className="space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className="flex items-center p-2 rounded-md bg-white"
                    >
                      {question.correctAnswers.includes(optIndex) ? (
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-gray-300 mr-2 flex-shrink-0" />
                      )}
                      <span className={
                        question.correctAnswers.includes(optIndex)
                          ? 'text-green-700 font-medium'
                          : 'text-gray-600'
                      }>
                        {option}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}