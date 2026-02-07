
'use client';

import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
      <div className="relative mb-8">
        <div className="absolute inset-0 scale-[2.5] animate-ping opacity-20 bg-indigo-500 rounded-full blur-2xl"></div>
        <div className="bg-indigo-600 w-32 h-32 rounded-[3rem] shadow-[0_0_50px_rgba(79,70,229,0.4)] flex items-center justify-center relative z-10 animate-bounce transition-all duration-700">
          <svg className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
        </div>
      </div>
      
      <div className="text-center">
        <h1 className="text-white text-5xl font-black tracking-tighter mb-2">VIPSTUDY</h1>
        <p className="text-indigo-400 text-sm font-black tracking-[0.4em] uppercase">PARMAR Academy</p>
      </div>

      <div className="absolute bottom-20 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-500 w-full animate-loader"></div>
      </div>

      {/* Fixed: Removed jsx attribute from style tag as it's not a standard React prop */}
      <style>{`
        @keyframes loader {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-loader {
          animation: loader 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
