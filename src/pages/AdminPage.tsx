import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminForm } from '../components/AdminForm';
import { QuizCreator } from '../components/QuizCreator';
import { QuizResultsAdmin } from '../components/AdminResults/QuizResultsAdmin';
import { Quiz, Question } from '../types/quiz';
import { saveQuiz } from '../services/quizService';
import { Pencil, BarChart, ArrowLeft, Edit2 } from 'lucide-react';
import { useNotification } from '../components/Notification/NotificationContext';

type AdminView = 'create' | 'results';

const initialQuizState: Quiz = {
  id: crypto.randomUUID(),
  name: '',
  code: '',
  questions: []
};

export function AdminPage() {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [view, setView] = useState<AdminView>('create');
  const [step, setStep] = useState<'admin' | 'creator'>('admin');
  const [isEditingQuiz, setIsEditingQuiz] = useState(false);
  const [quiz, setQuiz] = useState<Quiz>(initialQuizState);
  const [isSaving, setIsSaving] = useState(false);

  const resetQuizState = () => {
    setQuiz(initialQuizState);
    setStep('admin');
    setIsEditingQuiz(false);
  };

  const handleViewChange = (newView: AdminView) => {
    if (view !== newView) {
      setView(newView);
      if (newView === 'create') {
        resetQuizState();
      }
    }
  };

  const handleAdminNext = (name: string, code: string) => {
    setQuiz(prev => ({ ...prev, name, code }));
    setStep('creator');
    setIsEditingQuiz(false);
  };

  const handleAddQuestion = (question: Question) => {
    setQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, question]
    }));
  };

  const handleDeleteQuestion = (id: string) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id)
    }));
  };

  const handleSaveQuiz = async () => {
    if (quiz.questions.length === 0) {
      showNotification('Please add at least one question to the quiz', 'error');
      return;
    }

    try {
      setIsSaving(true);
      const savedQuiz = await saveQuiz(quiz);
      showNotification(`Quiz saved successfully! Share this code with your team: ${quiz.code}`, 'success');
      setView('results');
      resetQuizState();
    } catch (error) {
      console.error('Error saving quiz:', error);
      showNotification('Failed to save quiz. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => handleViewChange('create')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                view === 'create'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-indigo-50'
              }`}
            >
              <Pencil className="w-5 h-5 mr-2" />
              Create Quiz
            </button>
            <button
              onClick={() => handleViewChange('results')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                view === 'results'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-indigo-50'
              }`}
            >
              <BarChart className="w-5 h-5 mr-2" />
              View Results
            </button>
          </div>

          {view === 'create' ? (
            <>
              {step === 'creator' && !isEditingQuiz && (
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-4xl font-bold text-gray-900">{quiz.name}</h1>
                  <button
                    onClick={() => setIsEditingQuiz(true)}
                    className="flex items-center px-3 py-1 text-sm bg-white text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit Quiz Details
                  </button>
                </div>
              )}
              
              <div className="backdrop-blur-sm rounded-xl  p-8">
                {(step === 'admin' || isEditingQuiz) ? (
                  <div className="flex justify-center">
                    <AdminForm 
                      onNext={handleAdminNext}
                      initialName={quiz.name}
                      initialCode={quiz.code}
                    />
                  </div>
                ) : (
                  <>
                    <QuizCreator
                      questions={quiz.questions}
                      onAddQuestion={handleAddQuestion}
                      onDeleteQuestion={handleDeleteQuestion}
                    />
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={handleSaveQuiz}
                        disabled={isSaving}
                        className="btn-success"
                      >
                        {isSaving ? 'Saving...' : 'Save Quiz'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <QuizResultsAdmin />
          )}
        </div>
      </div>
    </div>
  );
}