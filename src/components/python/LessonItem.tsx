
import React from "react";

export interface LessonContentItem {
  text: string;
  type: "paragraph" | "code";
}

export interface LessonData {
  title: string;
  summary: string;
  content: LessonContentItem[];
  sampleCode: string;
}

interface LessonItemProps {
  lesson: LessonData;
  isExpanded: boolean;
  index: number;
  onToggle: (index: number) => void;
  onTryCode: (code: string) => void;
}

const LessonItem: React.FC<LessonItemProps> = ({
  lesson,
  isExpanded,
  index,
  onToggle,
  onTryCode,
}) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div 
        className="flex justify-between items-center cursor-pointer" 
        onClick={() => onToggle(index)}
      >
        <h3 className="text-lg font-bold text-indigo-700">{lesson.title}</h3>
        <span className="text-indigo-700">
          {isExpanded ? "▲" : "▼"}
        </span>
      </div>
      
      <p className="text-gray-800 mt-2 leading-relaxed">{lesson.summary}</p>
      
      {isExpanded && (
        <div className="mt-4 border-t pt-4 space-y-3">
          {lesson.content.map((item, itemIndex) => (
            <div key={itemIndex}>
              {item.type === "paragraph" ? (
                <p className="text-gray-800 mb-2">{item.text}</p>
              ) : (
                <div>
                  <pre className="bg-gray-100 p-3 rounded font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                    {item.text}
                  </pre>
                  <button 
                    onClick={() => onTryCode(item.text)}
                    className="mt-2 text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1 rounded transition-colors"
                  >
                    נסו את הקוד הזה
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LessonItem;
