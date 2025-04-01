
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
      className="bg-indigo-600/80 border-indigo-500/50 text-white shadow-md hover:shadow-lg hover:bg-indigo-700/90 cursor-pointer transition-all duration-200 backdrop-blur-sm"
      onClick={handleClick}
    >
      <CardHeader className="bg-indigo-800/90 rounded-t-lg pb-1 border-b border-indigo-400/30">
        <CardTitle className="text-lg font-bold text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <p className={`text-sm text-white ${isExpanded ? "" : "line-clamp-2"}`} dir="rtl">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
