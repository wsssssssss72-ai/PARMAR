
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-xl border-b border-slate-100 z-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-indigo-200">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <span className="font-black text-slate-900 text-xl tracking-tighter"parmar academy></span>
        </Link>

        {!isHome && (
          <Link href="/" className="hidden md:flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-indigo-600 transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Courses
          </Link>
        )}

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end hidden sm:flex">
             <span className="text-xs font-black text-slate-900">John Doe</span>
             <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">powerd by vipstudy </span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border-2 border-white shadow-md flex items-center justify-center text-sm font-black text-indigo-600">
            JD
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
