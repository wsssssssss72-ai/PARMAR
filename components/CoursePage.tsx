
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { data } from '../data';

const CoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = data.courses.find(c => c.id === courseId);

  if (!course) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-[slideIn_0.4s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-end gap-6 mb-12">
        <div className="w-full md:w-64 h-40 bg-slate-200 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
          <img src={course.thumbnail} alt={course.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{course.name}</h1>
          <p className="text-slate-500 text-lg">{course.description}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Subjects</h3>
        {course.subjects.map((subject, index) => (
          <Link 
            key={subject.id} 
            to={`/class/${course.id}/${subject.id}`}
            className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {subject.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  <span className="text-slate-300 mr-3">{index + 1}.</span>
                  {subject.name}
                </h4>
                <p className="text-slate-400 text-sm mt-0.5">{subject.videos.length} Lectures</p>
              </div>
            </div>
            
            <div className="p-2 rounded-full bg-slate-50 group-hover:bg-indigo-50 group-hover:text-indigo-600 text-slate-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default CoursePage;
