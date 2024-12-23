import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizData } from '../../types/quiz';
import { Trophy, Target, XCircle, Check, X } from 'lucide-react';

interface QuizResultsProps {
  quizData: QuizData;
  playerName: string;
  answers: Record<string, number[]>;
}

export function QuizResults({ quizData, playerName, answers }: QuizResultsProps) {
  const navigate = useNavigate();
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Calculate results
    const questionResults = quizData.questions.map(question => {
      const userAnswers = answers[question.id] || [];
      const correctOptions = question.options
        .map((opt, index) => ({ ...opt, index }))
        .filter(opt => opt.is_correct);
      
      const isCorrect = userAnswers.length === correctOptions.length &&
        userAnswers.every(ans => correctOptions.some(opt => opt.index === ans));

      return {
        text: question.text,
        correct: isCorrect,
        userAnswers: userAnswers.map(index => question.options[index].text),
        correctAnswers: correctOptions.map(opt => opt.text)
      };
    });

    const correctCount = questionResults.filter(r => r.correct).length;
    const finalScore = (correctCount / quizData.questions.length) * 100;

    setTimeout(() => {
      setResults(questionResults);
      setScore(finalScore);
      setShowResults(true);
    }, 500);
  }, [quizData, answers]);

  const handleJoinNewQuiz = () => {
  window.location.reload();
};

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
      <div className="text-center">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
        <p className="text-lg text-gray-600">Great job, {playerName}!</p>
        <div className="mt-4">
          <span className="text-4xl font-bold text-indigo-600">{score.toFixed(1)}%</span>
          <span className="text-gray-500 ml-2">Score</span>
        </div>
      </div>

      <div className="relative pt-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-lg font-medium text-gray-900">Results Breakdown</span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-center mb-6">
          <div className="bg-green-50 rounded-lg p-4">
            <Target className="w-8 h-8 mx-auto text-green-500 mb-2" />
            <div className="text-2xl font-bold text-green-600">
              {results.filter(r => r.correct).length}
            </div>
            <div className="text-sm text-green-600">Correct Answers</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <XCircle className="w-8 h-8 mx-auto text-red-500 mb-2" />
            <div className="text-2xl font-bold text-red-600">
              {results.filter(r => !r.correct).length}
            </div>
            <div className="text-sm text-red-600">Incorrect Answers</div>
          </div>
        </div>

        <div className="space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              className={`transform transition-all duration-500 ${
                showResults ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">Question {index + 1}</div>
                    <div className="text-gray-900 font-medium">{result.text}</div>
                  </div>
                  <div className={`ml-4 flex-shrink-0 ${
                    result.correct ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {result.correct ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <X className="w-6 h-6" />
                    )}
                  </div>
                </div>

                {!result.correct && (
                  <div className="mt-3 space-y-3">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-red-600">Your answer:</div>
                      <div className="text-sm text-gray-600">
                        {result.userAnswers.length > 0 
                          ? result.userAnswers.join(', ')
                          : 'No answer provided'}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-green-600">Correct answer:</div>
                      <div className="text-sm text-gray-600">
                        {result.correctAnswers.join(', ')}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-2">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                    <div
                      className={`transition-all duration-1000 ease-out ${
                        result.correct ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{
                        width: showResults ? '100%' : '0%'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-6">
          <button
            onClick={handleJoinNewQuiz}
            className="btn-primary"
          >
            Join New Quiz
          </button>
        </div>
      </div>
    </div>
  );
}