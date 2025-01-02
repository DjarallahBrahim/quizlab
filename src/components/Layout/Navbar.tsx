import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { BrainCircuit, Book, Info, Mail, Menu, X } from 'lucide-react';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <BrainCircuit className="w-8 h-8" />
            <span className="text-xl font-bold">Quiz Lab</span>
          </button>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <div className={`${
            isMenuOpen
              ? 'absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg p-4 space-y-2'
              : 'hidden'
            } md:relative md:flex md:items-center md:space-x-6 md:top-0 md:p-0 md:shadow-none md:space-y-0 md:bg-transparent`}>
            <Link
              to="/how-to-use"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors w-full md:w-auto ${
                isActive('/how-to-use')
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <Book className="w-5 h-5" />
              <span>How to Use</span>
            </Link>

            <Link
              to="/about"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors w-full md:w-auto ${
                isActive('/about')
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <Info className="w-5 h-5" />
              <span>About</span>
            </Link>

            <Link
              to="/contact"
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors w-full md:w-auto"
            >
              <Mail className="w-5 h-5" />
              <span>Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}