import React, { useState } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { generateQuestions, GeneratedQuestion } from '../../services/aiService';
import { useNotification } from '../Notification/NotificationContext';

interface AIAssistantProps {
  onClose: () => void;
  isVisible: boolean;
  onQuestionsGenerated?: (questions: GeneratedQuestion[]) => void;
}

export function AIAssistant({ onClose, isVisible, onQuestionsGenerated }: AIAssistantProps) {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const questions = await generateQuestions(topic);
      setGeneratedQuestions(questions);
      if (onQuestionsGenerated) {
        onQuestionsGenerated(questions);
      }
      showNotification('Questions generated successfully!', 'success');
    } catch (error) {
      console.error('Failed to generate questions:', error);
      showNotification('Failed to generate questions. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-900">AI Assistant</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                Enter a topic or question
              </label>
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={4}
                placeholder="e.g., Create a quiz about heart disease with 5 questions"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                AI will generate questions based on your input
              </p>
              <button
                type="submit"
                disabled={!topic.trim() || isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Generate
                  </>
                )}
              </button>
            </div>
          </form>

          {isLoading && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                </div>
                <p className="text-sm text-gray-600">
                  AI is crafting your quiz questions...
                </p>
              </div>
            </div>
          )}
          
          {generatedQuestions.length > 0 && !isLoading && (
            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Generated Questions:</h3>
              <div className="space-y-3">
                {generatedQuestions.map((question, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">{question.text}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Type: {question.type === 'single' ? 'Single Answer' : 'Multiple Answers'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}