
import React from 'react';

const Index = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')",
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="text-center relative z-10 text-white">
        <h1 className="text-4xl font-bold mb-4">ברוכים הבאים למחנה WIN CAMP</h1>
        <p className="text-xl">עולם של הרפתקאות טכנולוגיות, יצירה ולמידה</p>
      </div>
    </div>
  );
};

export default Index;

