import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center h-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <BrainCircuit className="w-8 h-8" />
            <span className="text-xl font-bold">Quiz Lab</span>
          </button>
        </div>
      </div>
    </nav>
  );
}