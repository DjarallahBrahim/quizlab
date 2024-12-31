import React from 'react';
import { Check } from 'lucide-react';

interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  onClick: () => void;
  buttonText: string;
}

export function RoleCard({
  icon,
  title,
  description,
  features,
  onClick,
  buttonText
}: RoleCardProps) {
  return (
    <div className="widget bg-white/80 backdrop-blur-sm p-8 flex flex-col h-full transform transition-all duration-100 hover:scale-105 hover:shadow-2xl">
      <div className="flex-1">
        <div className="w-24 h-24 mx-auto mb-6 bg-indigo-50 rounded-full flex items-center justify-center">
          <div className="w-12 h-12">
            {icon}
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
          {title}
        </h2>
        
        <p className="text-gray-600 text-center mb-8">
          {description}
        </p>

        <div className="space-y-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center p-3 bg-white rounded-lg shadow-sm"
            >
              <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <Check className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onClick}
        className="mt-8 w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium transition-all duration-100 hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {buttonText}
      </button>
    </div>
  );
}