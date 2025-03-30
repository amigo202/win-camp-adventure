
import React, { useState } from 'react';
import { lessons } from '../components/python/lessonsData';
import LessonItem from '../components/python/LessonItem';
import FinalProject from '../components/python/FinalProject';
import PythonPlayground from '../components/PythonPlayground';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PythonCourse: React.FC = () => {
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [playgroundCode, setPlaygroundCode] = useState("# כתבו את הקוד שלכם כאן\nprint('שלום עולם!')");

  const toggleLesson = (index: number) => {
    if (expandedLesson === index) {
      setExpandedLesson(null);
    } else {
      setExpandedLesson(index);
      // If a lesson has sample code and is expanded, update the playground
      if (lessons[index].sampleCode) {
        setPlaygroundCode(lessons[index].sampleCode);
      }
    }
  };

  const tryCode = (code: string) => {
    setPlaygroundCode(code);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-indigo-800">קורס פייתון למתחילים</h1>
          <Link to="/dashboard" className="flex items-center text-indigo-600 hover:text-indigo-800">
            <ArrowRight className="mr-1" />
            חזרה ללוח הבקרה
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">שיעורים</h2>
              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <LessonItem 
                    key={index}
                    lesson={lesson}
                    isExpanded={expandedLesson === index}
                    index={index}
                    onToggle={toggleLesson}
                    onTryCode={tryCode}
                  />
                ))}
                <FinalProject onTryCode={tryCode} />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold text-indigo-700 mb-4">סביבת פייתון</h2>
                <PythonPlayground initialCode={playgroundCode} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PythonCourse;
