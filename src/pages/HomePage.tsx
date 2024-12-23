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
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Welcome to Quiz Lab
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <RoleCard
            icon={<Users className="w-12 h-12 text-indigo-600" />}
            title="Team Member"
            description="Take quizzes created by your team admin and track your progress"
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
            icon={<UserCog className="w-12 h-12 text-indigo-600" />}
            title="Team Admin"
            description="Create and manage quizzes for your team members"
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