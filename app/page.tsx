
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { data } from '@/data';
import SplashScreen from '@/components/SplashScreen';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 animate-fade-in">
      <div className="mb-12 text-center sm:text-left">
        <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Welcome Back, Learner</h1>
        <p className="text-slate-500 text-lg">Continue your learning journey with our premium courses.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.courses.map((course) => (
          <Link 
            key={course.id} 
            href={`/course/${course.id}`}
            className="group relative bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 overflow-hidden"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img 
                src={course.thumbnail} 
                alt={course.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[10px] font-bold text-indigo-600 shadow-xl border border-white/50 uppercase tracking-widest">
                {course.subjects.length} Modules
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                {course.name}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                {course.description}
              </p>
              
              <div className="mt-8 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i + course.id}`} alt="user" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                    +12k
                  </div>
                </div>
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                  View Course
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Fixed: Removed jsx and global attributes to satisfy TypeScript compiler */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
