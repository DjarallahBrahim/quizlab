import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Question } from '../types/quiz';
import { useQuestionOptions } from '../hooks/useQuestionOptions';
import { useNotification } from '../components/Notification/NotificationContext';

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
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Question Type
        </label>
        <div className="mt-2 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={type === 'single'}
              onChange={() => {
                setType('single');
                setCorrectAnswers([]);
              }}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2">Single Answer</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={type === 'multiple'}
              onChange={() => {
                setType('multiple');
                setCorrectAnswers([]);
              }}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2">Multiple Answers</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Question
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white p-2"
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
          <div className="space-x-2">
            <button
              type="button"
              onClick={addOption}
              disabled={!canAddMore}
              className="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} className="mr-1" />
              Add Option
            </button>
          </div>
        </div>

        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type={type === 'single' ? 'radio' : 'checkbox'}
              checked={correctAnswers.includes(index)}
              onChange={() => toggleAnswer(index)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <input
              type="text"
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white p-2"
              placeholder={`Option ${index + 1}`}
              required
            />
            {canRemove && (
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <Minus size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Question
      </button>
    </form>
  );
}