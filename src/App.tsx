import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminPage } from './pages/AdminPage';
import { PlayerPage } from './pages/PlayerPage';
import { HomePage } from './pages/HomePage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { NotificationProvider } from './components/Notification/NotificationContext';
import { NotificationList } from './components/Notification/NotificationList';
import { Navbar } from './components/Layout/Navbar';

export default function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <NotificationList />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/play" element={<PlayerPage />} />
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  );
}