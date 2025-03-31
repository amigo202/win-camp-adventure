
import React from 'react';
import Header from '../components/Header';
import PythonLessonsSection from '../components/PythonLessonsSection';
import PythonPlayground from '../components/PythonPlayground';
import StarsBackground from '../components/StarsBackground';

const PythonCourse: React.FC = () => {
  return (
    <div className="min-h-screen py-6 px-4 md:px-8 relative bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50" dir="rtl">
      <StarsBackground />
      
      <div className="max-w-6xl mx-auto">
        <Header />
        
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-blue-900">קורס פייתון לילדים</h1>
          <p className="text-lg leading-relaxed">
            ברוכים הבאים לקורס פייתון - שפת התכנות הפופולרית בעולם! כאן תלמדו את יסודות התכנות בצורה פשוטה ומהנה.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PythonLessonsSection />
          <PythonPlayground />
        </div>
      </div>
      
      <div className="mt-10 text-center text-blue-700 text-lg bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-lg mx-auto">
        WIN CAMP &copy; {new Date().getFullYear()} | קורס פייתון לילדים
      </div>
    </div>
  );
};

export default PythonCourse;
