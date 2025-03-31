
import React from 'react';
import Header from '../components/Header';
import GuideNavigation from '../components/GuideNavigation';
import { getCurrentUser } from '../utils/authUtils';
import StarsBackground from '../components/StarsBackground';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react'; // Changed from Robot to Bot which exists in lucide-react

const Index = () => {
  const user = getCurrentUser();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 to-indigo-950">
      <StarsBackground />
      
      {/* Header Component */}
      <div className="container mx-auto px-4 pt-4">
        <Header />
        {user && <GuideNavigation />}
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative mt-8">
        <div 
          className="w-full max-w-5xl mx-auto bg-cover bg-center rounded-xl overflow-hidden relative"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1531482615713-2afd69aebba0')",
            height: "500px"
          }}
        >
          <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm"></div>
          <div className="text-center relative z-10 text-white p-8 h-full flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">ברוכים הבאים למחנה WIN CAMP</h1>
            <p className="text-xl mb-4">עולם של הרפתקאות טכנולוגיות, יצירה ולמידה</p>
            <div className="mt-6 text-lg opacity-80">מחנה מחשבים מרגש לילדים סקרניים וחדשניים</div>
            
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link 
                to="/tools" 
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-all transform hover:scale-105"
              >
                הכלים שלנו
              </Link>
              <Link 
                to="/login" 
                className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-medium rounded-full transition-all backdrop-blur-sm transform hover:scale-105"
              >
                התחברות למדריכים
              </Link>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="w-full max-w-5xl mx-auto mt-12 px-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3 text-white">למידה חווייתית</h3>
              <p className="text-white/80">תכנות, משחקים, ויצירה בסביבה תומכת ומהנה</p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3 text-white">כלים חדשניים</h3>
              <p className="text-white/80">גישה למגוון כלים טכנולוגיים עדכניים ומתקדמים</p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3 text-white">פיתוח מיומנויות</h3>
              <p className="text-white/80">חיזוק יכולות חשיבה, יצירתיות ופתרון בעיות</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
