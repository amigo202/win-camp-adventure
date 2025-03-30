
import React from "react";
import { useNavigate } from "react-router-dom";

const PythonLessonsSection: React.FC = () => {
  const navigate = useNavigate();

  const handleStartPython = () => {
    navigate('/python-course');
  };

  return (
    <div className="bg-yellow-50 rounded-xl p-6 shadow-md" dir="rtl">
      <button
        onClick={handleStartPython}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg w-full text-lg transition-all transform hover:scale-105"
      >
        💻 שיעור פייתון - לחץ להתחלה
      </button>
    </div>
  );
};

export default PythonLessonsSection;
