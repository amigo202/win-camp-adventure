
import React, { useState } from "react";
import PythonPlayground from "./PythonPlayground";
import LessonItem from "./python/LessonItem";
import FinalProject from "./python/FinalProject";
import { lessons } from "./python/lessonsData";

const PythonLessonsSection: React.FC = () => {
  const [showLessons, setShowLessons] = useState(false);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [showPlayground, setShowPlayground] = useState(false);
  const [playgroundCode, setPlaygroundCode] = useState("# כתבו את הקוד שלכם כאן\nprint('שלום עולם!')");

  const toggleLesson = (index: number) => {
    if (expandedLesson === index) {
      setExpandedLesson(null);
    } else {
      setExpandedLesson(index);
      // If a lesson has sample code and is expanded, update the playground
      if (lessons[index].sampleCode) {
        setPlaygroundCode(lessons[index].sampleCode);
        setShowPlayground(true);
      }
    }
  };

  const tryCode = (code: string) => {
    setPlaygroundCode(code);
    setShowPlayground(true);
    // Scroll to playground
    setTimeout(() => {
      document.getElementById('python-playground')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="bg-yellow-50 rounded-xl p-6 shadow-md" dir="rtl">
      <button
        onClick={() => setShowLessons(!showLessons)}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        {showLessons ? "סגור שיעורי פייתון" : "💻 שיעור פייתון - לחץ להתחלה"}
      </button>

      {showLessons && (
        <div className="mt-6 space-y-4">
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

          {showPlayground && (
            <div id="python-playground" className="mt-6">
              <PythonPlayground initialCode={playgroundCode} />
            </div>
          )}

          <FinalProject onTryCode={tryCode} />
        </div>
      )}
    </div>
  );
};

export default PythonLessonsSection;
