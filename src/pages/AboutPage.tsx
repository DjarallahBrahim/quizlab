import React from 'react';
import { Code2, Heart } from 'lucide-react';
import { layout } from '../styles/constants';

export function AboutPage() {
  return (
    <div className={`${layout.gradient} min-h-screen py-12 px-4`}>
      <div className={layout.container}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Code2 className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About Quiz Lab
            </h1>
          </div>

          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
              <div className="prose max-w-none">
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  Quiz Lab was developed by DJARALLAH Azeddin with the vision of creating
                  an engaging and effective learning platform for teams.
                </p>
                
                <div className="flex items-center justify-center my-8">
                  <div className="bg-indigo-50 rounded-full p-6">
                    <Heart className="w-12 h-12 text-indigo-600" />
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  The application was born from a desire to help team members learn and
                  grow together through interactive quizzes and immediate feedback.
                  By combining modern technology with effective learning principles,
                  Quiz Lab provides a platform that makes learning both engaging and
                  efficient.
                </p>

                <div className="bg-indigo-50 rounded-lg p-6 my-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Our Mission
                  </h2>
                  <p className="text-gray-600">
                    To facilitate team learning and knowledge sharing through an
                    intuitive and engaging quiz platform that promotes continuous
                    improvement and collaboration.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Key Features
                </h2>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3"></span>
                    <span>Interactive quiz creation and management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3"></span>
                    <span>Real-time quiz participation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3"></span>
                    <span>Detailed analytics and progress tracking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3"></span>
                    <span>Team performance insights</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}