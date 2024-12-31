import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleCard } from '../components/Home/RoleCard';
import { Users, UserCog } from 'lucide-react';
import { layout } from '../styles/constants';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className={layout.gradient + " min-h-screen py-12 px-4"}>
      <div className={layout.container}>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Welcome to Quiz Lab
          </h1>
          <p className="text-xl text-gray-600">
            Create, share, and take quizzes with your team
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <RoleCard
            icon={<Users className="w-full h-full text-indigo-600" />}
            title="Team Member"
            description="Take quizzes and track your learning progress"
            features={[
              "Join quizzes using a code",
              "View your quiz results",
              "Track your learning progress",
              "Compete with team members"
            ]}
            onClick={() => navigate('/play')}
            buttonText="Join Quiz"
          />

          <RoleCard
            icon={<UserCog className="w-full h-full text-indigo-600" />}
            title="Team Admin"
            description="Create and manage quizzes for your team"
            features={[
              "Create custom quizzes",
              "Monitor team performance",
              "View detailed analytics",
              "Track team progress"
            ]}
            onClick={() => navigate('/admin/login')}
            buttonText="Sign In"
          />
        </div>
      </div>
    </div>
  );
}