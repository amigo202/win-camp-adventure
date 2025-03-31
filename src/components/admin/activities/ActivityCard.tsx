
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
      className="bg-indigo-700/30 border-indigo-600/50 text-white shadow-md hover:shadow-lg hover:bg-indigo-600/40 cursor-pointer transition-all duration-200 backdrop-blur-sm"
      onClick={handleClick}
    >
      <CardHeader className="bg-indigo-800/50 rounded-t-lg pb-1 border-b border-indigo-600/30">
        <CardTitle className="text-lg font-bold text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <p className={`text-sm text-indigo-100 ${isExpanded ? "" : "line-clamp-2"}`} dir="rtl">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
