
import React from 'react';
import { Sparkles } from 'lucide-react';

const ProgressSection: React.FC = () => {
  return (
    <div className="glass-card rounded-xl p-6 mb-8 animate-slide-in-bottom">
      <div className="flex items-center justify-center text-center">
        <Sparkles className="text-wincamp-orange mr-2" size={24} />
        <p className="text-lg font-bold text-wincamp-purple">
          כל לחיצת מקש היא צעד אל עולם הטכנולוגיה! אתם יכולים לשנות את העולם עם הכישרון והסקרנות שלכם 🚀✨
        </p>
      </div>
    </div>
  );
};

export default ProgressSection;
