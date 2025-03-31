
import React from 'react';
import { categories } from '../../utils/data';
import { getToolsByCategory } from '../../utils/data';
import { toast } from '../../components/ui/use-toast';

interface ProgressSectionProps {
  completedCount: number;
  updateCompletedCount: () => void;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ 
  completedCount, 
  updateCompletedCount 
}) => {
  const handleResetProgress = () => {
    if (window.confirm('האם אתה בטוח שברצונך לאפס את כל ההתקדמות?')) {
      resetCompletedTools();
      updateCompletedCount();
      toast({
        title: "ההתקדמות אופסה",
        description: "כל הפעילויות סומנו כלא הושלמו",
      });
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 mb-8 animate-slide-in-bottom">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">
        WIN CAMP - עולם של כלים ותוכנות
      </h1>
      
      <div className="flex flex-wrap justify-between items-center">
        <div className="text-wincamp-purple">
          <span className="font-bold">{completedCount}</span> פעילויות הושלמו מתוך {categories.reduce((acc, cat) => acc + getToolsByCategory(cat.id).length, 0)}
        </div>
        
        <button 
          onClick={handleResetProgress}
          className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-lg transition-all"
        >
          אפס התקדמות
        </button>
      </div>
    </div>
  );
};

// Make sure to import the resetCompletedTools function
import { resetCompletedTools } from '../../utils/authUtils';

export default ProgressSection;
