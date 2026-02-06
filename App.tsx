
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import HomePage from './components/HomePage';
import CoursePage from './components/CoursePage';
import ClassPage from './components/ClassPage';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500); // 3.5 seconds splash
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/course/:courseId" element={<CoursePage />} />
            <Route path="/class/:courseId/:subjectId" element={<ClassPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-slate-100 py-8 px-4">
          <div className="max-w-7xl mx-auto text-center text-slate-400 text-sm">
            © 2024 EduStream Premium. All rights reserved.
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
