
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { data } from '@/data';

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = data.courses.find(c => c.id === courseId);

  if (!course) return <div className="p-20 text-center font-bold">Course not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-slide-up">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-16">
        <div className="w-full md:w-80 h-48 bg-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl ring-8 ring-white">
          <img src={course.thumbnail} alt={course.name} className="w-full h-full object-cover" />
        </div>
        <div className="text-center md:text-left pt-4">
          <h1 className="text-4xl font-black text-slate-900 mb-4">{course.name}</h1>
          <p className="text-slate-500 text-xl leading-relaxed max-w-xl">{course.description}</p>
          <div className="flex items-center gap-4 mt-8 justify-center md:justify-start">
             <div className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Lifetime Access</div>
             <div className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Premium Certificate</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Curriculum Structure</h3>
        {course.subjects.map((subject, index) => (
          <Link 
            key={subject.id} 
            href={`/class/${course.id}/${subject.id}`}
            className="group flex items-center justify-between p-7 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-500"
          >
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                {subject.icon}
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  <span className="text-slate-300 mr-4 tabular-nums">0{index + 1}</span>
                  {subject.name}
                </h4>
                <p className="text-slate-400 text-sm mt-1 font-medium">{subject.videos.length} Premium Lectures • 4.5h Content</p>
              </div>
            </div>
            
            <div className="p-3 rounded-full bg-slate-50 group-hover:bg-indigo-600 text-slate-300 group-hover:text-white transition-all duration-500 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Fixed: Removed jsx and global attributes to satisfy TypeScript compiler */}
      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
