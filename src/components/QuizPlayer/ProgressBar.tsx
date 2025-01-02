import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-indigo-600">
          Question {current} of {total}
        </span>
        <span className="text-sm font-medium text-indigo-600">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="h-full w-full bg-gradient-to-t from-transparent to-white/20"></div>
        </div>
      </div>
    </div>
  );
}