import React, { useState } from 'react';
import { QuizEntry } from './QuizEntry';
import { QuestionView } from './QuestionView';
import { QuizResults } from './QuizResults';
import { QuizData } from '../../types/quiz';
import { saveQuizAnswers } from '../../services/quizAnswerService';
import { ProgressBar } from './ProgressBar';

export function QuizPlayer() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleStartQuiz = (quiz: QuizData, name: string) => {
    setQuizData(quiz);
    setPlayerName(name);
  };

  const handleAnswer = (selectedOptions: number[]) => {
    if (!quizData) return;
    
    const currentQuestion = quizData.questions[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedOptions
    }));
  };

  const calculateResults = () => {
    if (!quizData) return { score: 0, detailedAnswers: {} };

    const detailedAnswers: Record<string, { selectedOptions: number[]; isCorrect: boolean }> = {};
    let correctCount = 0;

    quizData.questions.forEach(question => {
      const userAnswers = answers[question.id] || [];
      const correctOptions = question.options
        .map((opt, index) => ({ ...opt, index }))
        .filter(opt => opt.is_correct);
      
      const isCorrect = userAnswers.length === correctOptions.length &&
        userAnswers.every(ans => correctOptions.some(opt => opt.index === ans));

      if (isCorrect) correctCount++;

      detailedAnswers[question.id] = {
        selectedOptions: userAnswers,
        isCorrect
      };
    });

    const score = (correctCount / quizData.questions.length) * 100;
    return { score, detailedAnswers };
  };

  const handleNext = async () => {
    if (!quizData) return;
    
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsSaving(true);
      try {
        const { score, detailedAnswers } = calculateResults();
        await saveQuizAnswers({
          quizId: quizData.id,
          playerName,
          score,
          answers: detailedAnswers
        });
      } catch (error) {
        console.error('Failed to save quiz answers:', error);
        // Continue to show results even if saving fails
      } finally {
        setIsSaving(false);
        setQuizCompleted(true);
      }
    }
  };

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">
            Join Quiz
          </h2>
          <QuizEntry onStartQuiz={handleStartQuiz} />
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
        <QuizResults
          quizData={quizData}
          playerName={playerName}
          answers={answers}
        />
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const hasAnswer = answers[currentQuestion.id]?.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{quizData.name}</h2>
            <div className="mt-4">
              <ProgressBar 
                current={currentQuestionIndex + 1} 
                total={quizData.questions.length} 
              />
            </div>
          </div>

          <QuestionView
            question={currentQuestion}
            onAnswer={handleAnswer}
          />

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!hasAnswer || isSaving}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : currentQuestionIndex < quizData.questions.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}