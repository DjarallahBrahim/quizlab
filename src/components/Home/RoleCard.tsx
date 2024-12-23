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
    <div className="card-hover flex flex-col h-full">
      <div className="p-6 flex-1">
        <div className="flex items-center justify-center mb-4">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          {description}
        </p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 pt-0">
        <button
          onClick={onClick}
          className="btn-primary w-full"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}