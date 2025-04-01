
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ActivityCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ title, description, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleClick = () => {
    onClick();
    setIsExpanded(!isExpanded);
  };
  
  return (
    <Card 
      className="bg-gradient-to-br from-indigo-600/90 to-indigo-700/90 border-indigo-500/50 text-white shadow-md hover:shadow-lg hover:shadow-indigo-500/30 cursor-pointer transition-all duration-200 backdrop-blur-sm transform hover:-translate-y-1"
      onClick={handleClick}
    >
      <CardHeader className="bg-indigo-800/90 rounded-t-lg pb-1 border-b border-indigo-400/30 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold text-white">{title}</CardTitle>
        {isExpanded ? 
          <ChevronUp className="text-indigo-300" size={18} /> : 
          <ChevronDown className="text-indigo-300" size={18} />
        }
      </CardHeader>
      <CardContent className="pt-2 bg-gradient-to-b from-transparent to-indigo-900/20">
        <p className={`text-sm text-white/90 ${isExpanded ? "" : "line-clamp-2"}`} dir="rtl">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
