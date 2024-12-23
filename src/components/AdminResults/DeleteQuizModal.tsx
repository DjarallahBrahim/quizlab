import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface DeleteQuizModalProps {
  quiz: { name: string; code: string } | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteQuizModal({ quiz, onClose, onConfirm }: DeleteQuizModalProps) {
  if (!quiz) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-center text-red-600 mb-4">
          <AlertTriangle size={48} />
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
          Delete Quiz
        </h3>
        
        <p className="text-sm text-gray-500 text-center mb-4">
          Are you sure you want to delete the quiz "{quiz.name}" ({quiz.code})?
          This action cannot be undone and all associated questions and results will be permanently deleted.
        </p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Delete Quiz
          </button>
        </div>
      </div>
    </div>
  );
}