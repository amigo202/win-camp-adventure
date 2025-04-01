import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import GuideNavigation from '../components/GuideNavigation';
import { getCurrentUser } from '../utils/authUtils';
import StarsBackground from '../components/StarsBackground';
import { Link } from 'react-router-dom';
import { Bot, Sparkles, Code, Cpu, Rocket, Gamepad2 } from 'lucide-react';

const Index = () => {
  const user = getCurrentUser();
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setAnimated(true), 100);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 overflow-x-hidden">
      <StarsBackground />
      
      <div className="container mx-auto px-4 pt-4">
        <Header />
        {user && <GuideNavigation />}
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center relative mt-4 md:mt-0">
        <div 
          className={`w-full max-w-6xl mx-auto rounded-xl overflow-hidden relative transition-all duration-1000 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="bg-gradient-to-r from-indigo-800/90 to-purple-800/90 p-8 md:p-16 backdrop-blur-md border border-indigo-500/30 rounded-xl shadow-2xl">
            <div className="text-center text-white">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-wincamp-yellow via-wincamp-orange to-wincamp-turquoise bg-clip-text text-transparent">
                    ברוכים הבאים למחנה WIN CAMP
                  </h1>
                  <Sparkles className="absolute -top-4 -right-8 text-wincamp-yellow animate-pulse" size={28} />
                </div>
              </div>
              <p className="text-xl md:text-2xl mb-4 text-indigo-200">עולם של הרפתקאות טכנולוגיות, יצירה ולמידה</p>
              <div className="mt-4 text-lg opacity-90 max-w-3xl mx-auto">
                מחנה מחשבים מרגש וחדשני לילדים סקרניים שרוצים לגלות עולמות חדשים בעזרת טכנולוגיה מתקדמת
              </div>
            </div>
            
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link 
                to="/tools" 
                className={`px-8 py-4 bg-gradient-to-r from-wincamp-blue to-wincamp-turquoise hover:from-wincamp-turquoise hover:to-wincamp-blue text-white font-medium rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-wincamp-turquoise/30 flex items-center ${animated ? 'animate-bounce-in' : 'opacity-0'}`}
                style={{ animationDelay: '0.3s' }}
              >
                <Rocket className="ml-2" />
                הכלים שלנו
              </Link>
              <Link 
                to="/login" 
                className={`px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-medium rounded-full transition-all backdrop-blur-sm transform hover:scale-105 flex items-center shadow-lg ${animated ? 'animate-bounce-in' : 'opacity-0'}`}
                style={{ animationDelay: '0.5s' }}
              >
                <Bot className="ml-2" />
                התחברות למדריכים
              </Link>
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-6xl mx-auto mt-12 px-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className={`bg-white rounded-xl p-8 shadow-lg text-gray-800 ${animated ? 'animate-slide-in-bottom' : 'opacity-0 translate-y-20'}`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{feature.title}</h3>
                </div>
                <p className="text-gray-600 text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div 
          className={`w-full max-w-6xl mx-auto mt-4 mb-16 px-4 ${animated ? 'animate-slide-in-bottom' : 'opacity-0'}`} 
          style={{ animationDelay: '0.7s' }}
        >
          <div className="p-8 rounded-xl bg-gradient-to-r from-wincamp-purple/30 to-wincamp-blue/30 backdrop-blur-md border border-white/10 shadow-lg">
            <div className="flex items-center justify-center">
              <Sparkles className="text-wincamp-yellow mr-3" size={28} />
              <p className="text-xl md:text-2xl font-bold text-center text-white">
                הצטרפו אלינו למסע טכנולוגי מרתק שיפתח לילדים עולם של אפשרויות חדשות! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    title: "למידה חווייתית",
    description: "תכנות, משחקים, ויצירה בסביבה תומכת ומהנה עם הדרכה אישית ומקצועית",
    icon: <Code size={24} />
  },
  {
    title: "כלים חדשניים",
    description: "גישה למגוון כלים טכנולוגיים עדכניים ומתקדמים שמעודדים יצירתיות וחדשנות",
    icon: <Cpu size={24} />
  },
  {
    title: "פיתוח מיומנויות",
    description: "חיזוק יכולות חשיבה, יצירתיות ופתרון בעיות דרך למידה מעשית והתנסות אמיתית",
    icon: <Gamepad2 size={24} />
  }
];

export default Index;
