import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminPage } from './pages/AdminPage';
import { PlayerPage } from './pages/PlayerPage';
import { HomePage } from './pages/HomePage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { NotificationProvider } from './components/Notification/NotificationContext';
import { NotificationList } from './components/Notification/NotificationList';
import { HowToUsePage } from './pages/HowToUsePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';

export default function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <NotificationList />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/play" element={<PlayerPage />} />
              <Route path="/how-to-use" element={<HowToUsePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </NotificationProvider>
  );
}