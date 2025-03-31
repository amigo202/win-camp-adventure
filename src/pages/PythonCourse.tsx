
import React from 'react';
import Header from '../components/Header';
import PythonLessonsSection from '../components/PythonLessonsSection';
import PythonPlayground from '../components/PythonPlayground';
import StarsBackground from '../components/StarsBackground';
import GuideNavigation from '../components/GuideNavigation';
import { getCurrentUser } from '../utils/authUtils';

const PythonCourse: React.FC = () => {
  const user = getCurrentUser();
  
  return (
    <div className="min-h-screen py-6 px-4 md:px-8 relative" dir="rtl">
      <StarsBackground />
      
      <div className="max-w-6xl mx-auto">
        <Header />
        {user && <GuideNavigation />}
        
        <div className="glass-card rounded-xl p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4">קורס פייתון לילדים</h1>
          <p className="text-lg">
            ברוכים הבאים לקורס פייתון - שפת התכנות הפופולרית בעולם! כאן תלמדו את יסודות התכנות בצורה פשוטה ומהנה.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PythonLessonsSection />
          <PythonPlayground />
        </div>
      </div>
      
      <div className="mt-10 text-center text-gray-500 text-sm">
        WIN CAMP &copy; {new Date().getFullYear()} | קורס פייתון לילדים
      </div>
    </div>
  );
};

export default PythonCourse;
