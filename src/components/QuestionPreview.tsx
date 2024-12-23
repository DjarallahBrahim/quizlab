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

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
      <div className="space-y-3">
        {questions.map((question, index) => (
          <div key={question.id} className="bg-white rounded-lg shadow">
            <div className="p-4">
              <div className="flex justify-between items-start">
                <button
                  onClick={() => toggleQuestion(question.id)}
                  className="flex-1 flex items-center text-left"
                >
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium">Question {index + 1}</h4>
                      <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                        {question.type === 'single' ? 'Single Answer' : 'Multiple Answers'}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-600 line-clamp-1">{question.text}</p>
                  </div>
                  {expandedQuestion === question.id ? (
                    <ChevronUp className="ml-2 w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="ml-2 w-5 h-5 text-gray-400" />
                  )}
                </button>
                <button
                  onClick={() => onDelete(question.id)}
                  className="ml-4 text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              {expandedQuestion === question.id && (
                <div className="mt-4 pl-4 border-l-2 border-gray-100">
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className="flex items-center space-x-2"
                      >
                        {question.correctAnswers.includes(optIndex) ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-gray-300" />
                        )}
                        <span className={question.correctAnswers.includes(optIndex) 
                          ? 'text-green-600' 
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
    </div>
  );
}