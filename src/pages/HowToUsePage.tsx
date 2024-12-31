import React from 'react';
import { Book, CheckCircle } from 'lucide-react';
import { layout } from '../styles/constants';

export function HowToUsePage() {
  return (
    <div className={`${layout.gradient} min-h-screen py-12 px-4`}>
      <div className={layout.container}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Book className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              How to Use Quiz Lab
            </h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide for team members
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Getting Started
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Join a Quiz</h3>
                    <p className="text-gray-600">Click on "Join Quiz" from the homepage or navigate to the player section.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Enter Quiz Code</h3>
                    <p className="text-gray-600">Enter your name and the quiz code provided by your team admin.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Take the Quiz</h3>
                    <p className="text-gray-600">Answer each question carefully. Some questions may have multiple correct answers.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Quiz Features
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Question Types</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Single choice questions</li>
                    <li>Multiple choice questions</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Results</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Immediate feedback</li>
                    <li>Detailed score breakdown</li>
                    <li>Correct answer review</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Tips for Success
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Read Carefully</h3>
                  <p className="text-gray-600">Take your time to read each question and all available options thoroughly.</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Check Answers</h3>
                  <p className="text-gray-600">Review your answers before submitting, especially for multiple-choice questions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}