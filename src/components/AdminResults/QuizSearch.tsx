import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface QuizSearchProps {
  onSearch: (code: string) => void;
}

export function QuizSearch({ onSearch }: QuizSearchProps) {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(code.toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter quiz code"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          maxLength={6}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-indigo-600"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
}