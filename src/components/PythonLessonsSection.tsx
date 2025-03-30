
import React, { useState } from "react";
import PythonPlayground from "./PythonPlayground";
import LessonItem from "./python/LessonItem";
import FinalProject from "./python/FinalProject";
import PythonLessonLayout from "./python/PythonLessonLayout";
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
  };

  return (
    <div className="bg-yellow-50 rounded-xl p-6 shadow-md" dir="rtl">
      <button
        onClick={() => setShowLessons(!showLessons)}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
      >
        {showLessons ? "סגור שיעורי פייתון" : "💻 שיעור פייתון - לחץ להתחלה"}
      </button>

      {showLessons && (
        <PythonLessonLayout>
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
          
          {showPlayground && (
            <div id="python-playground" className="sticky top-6">
              <PythonPlayground initialCode={playgroundCode} />
            </div>
          )}
        </PythonLessonLayout>
      )}
    </div>
  );
};

export default PythonLessonsSection;
