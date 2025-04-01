
import React from 'react';

const MotivationalQuote: React.FC = () => {
  const quote = "כל מסך הוא חלון להרפתקה, וכל קוד הוא מפתח לעולמות חדשים! אתם יכולים לשנות את העולם עם הידע שלכם 🚀✨";

  return (
    <div className="text-center p-4 bg-gradient-to-r from-wincamp-purple/20 to-wincamp-blue/20 rounded-xl">
      <p className="text-lg font-bold text-wincamp-purple">{quote}</p>
    </div>
  );
};

export default MotivationalQuote;
