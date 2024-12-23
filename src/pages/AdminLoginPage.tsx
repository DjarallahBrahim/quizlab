import React from 'react';
import { LoginForm } from '../components/Admin/LoginForm';
import { layout } from '../styles/constants';

export function AdminLoginPage() {
  return (
    <div className={`${layout.gradient} min-h-screen py-12 px-4`}>
      <div className={layout.container}>
        <LoginForm />
      </div>
    </div>
  );
}