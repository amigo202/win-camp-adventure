
import React from 'react';
import { categories } from '../../utils/data';
import { getToolsByCategory } from '../../utils/data';
import { toast } from '../../components/ui/use-toast';
import { Sparkles } from 'lucide-react';

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

  const totalActivities = categories.reduce((acc, cat) => acc + getToolsByCategory(cat.id).length, 0);

  return (
    <div className="glass-card rounded-xl p-6 mb-8 animate-slide-in-bottom">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-2 text-wincamp-purple">
          <Sparkles className="text-wincamp-orange" size={20} />
          <span className="font-bold text-xl">{completedCount}</span> 
          <span>פעילויות הושלמו מתוך {totalActivities}</span>
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
