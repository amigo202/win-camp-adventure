
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
    <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100">
      <div 
        className="flex justify-between items-center cursor-pointer" 
        onClick={() => onToggle(index)}
      >
        <h3 className="text-xl font-bold text-indigo-700 flex-grow">{lesson.title}</h3>
        <span className={`p-2 rounded-full transition-colors ${isExpanded ? 'bg-indigo-100 text-indigo-700' : 'text-gray-400'}`}>
          {isExpanded ? "▲" : "▼"}
        </span>
      </div>
      
      <p className="text-gray-700 mt-3 leading-relaxed text-base">{lesson.summary}</p>
      
      {isExpanded && (
        <div className="mt-5 border-t pt-4 space-y-5">
          {lesson.content.map((item, itemIndex) => (
            <div key={itemIndex} className={`p-4 rounded-md ${item.type === "paragraph" ? "bg-indigo-50" : "bg-gray-50"}`}>
              {item.type === "paragraph" ? (
                <p className="text-gray-800 text-base leading-relaxed">{item.text}</p>
              ) : (
                <div>
                  <pre className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto whitespace-pre-wrap border border-gray-200">
                    {item.text}
                  </pre>
                  <button 
                    onClick={() => onTryCode(item.text)}
                    className="mt-3 w-full text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-md transition-colors flex items-center justify-center"
                  >
                    <span className="ml-2">▶️</span>
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
