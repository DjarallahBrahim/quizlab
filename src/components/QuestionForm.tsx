import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Question } from '../types/quiz';
import { useQuestionOptions } from '../hooks/useQuestionOptions';
import { useNotification } from './Notification/NotificationContext';

interface QuestionFormProps {
  onSubmit: (question: Omit<Question, 'id'>) => void;
}

export function QuestionForm({ onSubmit }: QuestionFormProps) {
  const { showNotification } = useNotification();
  const [text, setText] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [type, setType] = useState<'single' | 'multiple'>('single');
  const { 
    options, 
    canAddMore, 
    canRemove, 
    addOption, 
    removeOption, 
    updateOption,
    resetOptions 
  } = useQuestionOptions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate correct answer selection
    if (correctAnswers.length === 0) {
      showNotification('Please select the correct answer for your question', 'error');
      return;
    }

    if (text && options.every(opt => opt.trim())) {
      onSubmit({ text, options, correctAnswers, type });
      setText('');
      resetOptions();
      setCorrectAnswers([]);
    }
  };

  const toggleAnswer = (index: number) => {
    if (type === 'single') {
      setCorrectAnswers([index]);
    } else {
      setCorrectAnswers(prev => 
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Question Type
        </label>
        <div className="flex space-x-4">
          <label className="relative flex items-center">
            <input
              type="radio"
              checked={type === 'single'}
              onChange={() => {
                setType('single');
                setCorrectAnswers([]);
              }}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="ml-2 text-sm text-gray-700">Single Answer</span>
          </label>
          <label className="relative flex items-center">
            <input
              type="radio"
              checked={type === 'multiple'}
              onChange={() => {
                setType('multiple');
                setCorrectAnswers([]);
              }}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="ml-2 text-sm text-gray-700">Multiple Answers</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Question Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-textarea w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          placeholder="Enter your question"
          required
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">
            Options ({options.length}/7)
          </label>
          <button
            type="button"
            onClick={addOption}
            disabled={!canAddMore}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Plus size={16} className="mr-1" />
            Add Option
          </button>
        </div>

        <div className="space-y-3">
          {options.map((option, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100"
            >
              <input
                type={type === 'single' ? 'radio' : 'checkbox'}
                checked={correctAnswers.includes(index)}
                onChange={() => toggleAnswer(index)}
                className={`h-4 w-4 ${
                  type === 'single' ? 'form-radio' : 'form-checkbox'
                } text-indigo-600 focus:ring-indigo-500`}
              />
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                className="flex-1 form-input rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder={`Option ${index + 1}`}
                required
              />
              {canRemove && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors duration-200"
                >
                  <Minus size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full btn-primary"
      >
        Add Question
      </button>
    </form>
  );
}