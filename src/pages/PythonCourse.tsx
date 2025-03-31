
import React from 'react';
import Header from '../components/Header';
import PythonLessonsSection from '../components/PythonLessonsSection';
import PythonPlayground from '../components/PythonPlayground';
import StarsBackground from '../components/StarsBackground';

const PythonCourse: React.FC = () => {
  return (
    <div className="page-container" dir="rtl">
      <StarsBackground />
      
      <div className="max-w-6xl mx-auto">
        <Header />
        
        <div className="content-section">
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
      
      <div className="footer-section">
        WIN CAMP &copy; {new Date().getFullYear()} | קורס פייתון לילדים
      </div>
    </div>
  );
};

export default PythonCourse;
