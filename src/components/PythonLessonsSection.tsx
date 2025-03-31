
import React from "react";

const PythonLessonsSection: React.FC = () => {
  return (
    <div className="bg-yellow-50 rounded-xl p-6 shadow-md" dir="rtl">
      <a 
        href="/python-course"
        className="block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg w-full text-lg transition-all transform hover:scale-105 text-center"
      >
        💻 שיעור פייתון - לחץ להתחלה
      </a>
    </div>
  );
};

export default PythonLessonsSection;
