import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/80 backdrop-blur-sm shadow-lg mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2 text-indigo-600">
            <BrainCircuit className="w-6 h-6" />
            <span className="text-lg font-bold">Quiz Lab</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <Link to="/how-to-use" className="hover:text-indigo-600 transition-colors">
              How to Use
            </Link>
            <Link to="/about" className="hover:text-indigo-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="hover:text-indigo-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center text-sm text-gray-600">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by DJARALLAH Azeddin
          </div>

          <div className="text-sm text-gray-500">
            © {currentYear} Quiz Lab. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}