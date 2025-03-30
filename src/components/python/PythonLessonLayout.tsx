
import React from 'react';

interface PythonLessonLayoutProps {
  children: React.ReactNode;
}

const PythonLessonLayout: React.FC<PythonLessonLayoutProps> = ({ children }) => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 bg-yellow-50 rounded-xl shadow-md" dir="rtl">
      <div className="lg:col-span-6 xl:col-span-7 space-y-6">
        {React.Children.toArray(children)[0]}
      </div>
      <div className="lg:col-span-6 xl:col-span-5 space-y-6">
        {React.Children.toArray(children)[1]}
      </div>
    </div>
  );
};

export default PythonLessonLayout;
