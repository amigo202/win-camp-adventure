
import React from 'react';
import { BookOpen } from 'lucide-react';

interface GuideLoginSectionProps {
  setGuideLogin: (guideNumber: number) => void;
}

const GuideLoginSection: React.FC<GuideLoginSectionProps> = ({ setGuideLogin }) => {
  return (
    <div className="mt-6 border-t border-indigo-200 pt-4">
      <div className="text-center text-sm text-indigo-700 mb-3">כניסה למדריכים</div>
      <div className="flex gap-2 justify-center">
        <button
          type="button"
          onClick={() => setGuideLogin(1)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1"
        >
          <BookOpen size={14} />
          מדריך 1
        </button>
        
        <button
          type="button"
          onClick={() => setGuideLogin(2)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1"
        >
          <BookOpen size={14} />
          מדריך 2
        </button>
      </div>
    </div>
  );
};

export default GuideLoginSection;
