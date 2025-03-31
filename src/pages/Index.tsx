
import React from 'react';
import Header from '../components/Header';
import GuideNavigation from '../components/GuideNavigation';
import { getCurrentUser } from '../utils/authUtils';
import StarsBackground from '../components/StarsBackground';

const Index = () => {
  const user = getCurrentUser();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <StarsBackground />
      
      {/* Header Component */}
      <div className="container mx-auto px-4 pt-4">
        <Header />
        {user && <GuideNavigation />}
      </div>
      
      {/* Main Content */}
      <div 
        className="flex-1 flex items-center justify-center bg-cover bg-center relative mt-8 p-6 md:p-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1531482615713-2afd69aebba0')",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm"></div>
        <div className="text-center relative z-10 text-white p-8 max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">ברוכים הבאים למחנה WIN CAMP</h1>
          <p className="text-xl mb-6 leading-relaxed">עולם של הרפתקאות טכנולוגיות, יצירה ולמידה</p>
          <div className="mt-8 text-lg opacity-80 bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg">
            מחנה מחשבים מרגש לילדים סקרניים וחדשניים
          </div>
        </div>
      </div>
      
      <div className="footer-section">
        WIN CAMP &copy; {new Date().getFullYear()} | עולם של הרפתקאות טכנולוגיות
      </div>
    </div>
  );
};

export default Index;
