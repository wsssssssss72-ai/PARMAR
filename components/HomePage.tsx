
import React from 'react';
import { Link } from 'react-router-dom';
import { data } from '../data';

const HomePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="mb-10 text-center sm:text-left">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">My Batches</h2>
        <p className="text-slate-500">Pick up where you left off or start a new journey.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.courses.map((course) => (
          <Link 
            key={course.id} 
            to={`/course/${course.id}`}
            className="group block bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden"
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={course.thumbnail} 
                alt={course.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indigo-600 shadow-sm">
                {course.subjects.length} Subjects
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {course.name}
              </h3>
              <p className="text-slate-500 text-sm line-clamp-2">
                {course.description}
              </p>
              
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Premium Access</span>
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
