
import React from 'react';

interface PythonLessonLayoutProps {
  children: React.ReactNode;
}

const PythonLessonLayout: React.FC<PythonLessonLayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-yellow-50 rounded-xl shadow-md" dir="rtl">
      <div className="space-y-6">
        {React.Children.toArray(children)[0]}
      </div>
      <div className="space-y-6">
        {React.Children.toArray(children)[1]}
      </div>
    </div>
  );
};

export default PythonLessonLayout;
