
import React from 'react';

const Index = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1531482615713-2afd69aebba0')",
      }}
    >
      <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm"></div>
      <div className="text-center relative z-10 text-white">
        <h1 className="text-4xl font-bold mb-4">ברוכים הבאים למחנה WIN CAMP</h1>
        <p className="text-xl">עולם של הרפתקאות טכנולוגיות, יצירה ולמידה</p>
        <div className="mt-6 text-lg opacity-80">מחנה מחשבים מרגש לילדים סקרניים וחדשניים</div>
      </div>
    </div>
  );
};

export default Index;
