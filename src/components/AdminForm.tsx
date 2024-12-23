import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { generateQuizCode } from '../utils/generateCode';

interface AdminFormProps {
  onNext: (name: string, code: string) => void;
  initialName?: string;
  initialCode?: string;
}

export function AdminForm({ onNext, initialName = '', initialCode = '' }: AdminFormProps) {
  const [quizName, setQuizName] = useState(initialName);
  const [quizCode, setQuizCode] = useState(initialCode);

  useEffect(() => {
    setQuizName(initialName);
    setQuizCode(initialCode);
  }, [initialName, initialCode]);

  const handleGenerateCode = () => {
    setQuizCode(generateQuizCode());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quizName && quizCode) {
      onNext(quizName, quizCode);
    }
  };

  return (
    <div className="max-w-md w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="quizName" className="block text-sm font-medium text-gray-700">
            Quiz Name
          </label>
          <input
            type="text"
            id="quizName"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white p-2"
            placeholder="Enter quiz name"
            required
          />
        </div>

        <div>
          <label htmlFor="quizCode" className="block text-sm font-medium text-gray-700">
            Quiz Code
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="quizCode"
              value={quizCode}
              onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
              className="block w-full rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white p-2"
              placeholder="Quiz code"
              required
            />
            <button
              type="button"
              onClick={handleGenerateCode}
              className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-indigo-600 px-3 text-white hover:bg-indigo-700"
            >
              <Sparkles size={20} />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {initialName || initialCode ? 'Update Quiz' : 'Next'}
        </button>
      </form>
    </div>
  );
}