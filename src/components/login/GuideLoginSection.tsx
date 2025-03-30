
import React from 'react';
import { BookOpen } from 'lucide-react';

interface GuideLoginSectionProps {
  setGuideLogin: (guideNumber: number) => void;
}

const GuideLoginSection: React.FC<GuideLoginSectionProps> = ({ setGuideLogin }) => {
  return (
    <div className="mt-6 border-t border-indigo-200 pt-4">
      <div className="text-center text-base font-medium text-indigo-700 mb-3">כניסה למדריכים</div>
      <div className="flex gap-2 justify-center">
        <button
          type="button"
          onClick={() => setGuideLogin(1)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg text-base flex items-center gap-2 font-bold"
        >
          <BookOpen size={18} />
          מדריך 1
        </button>
        
        <button
          type="button"
          onClick={() => setGuideLogin(2)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg text-base flex items-center gap-2 font-bold"
        >
          <BookOpen size={18} />
          מדריך 2
        </button>
      </div>
    </div>
  );
};

export default GuideLoginSection;
