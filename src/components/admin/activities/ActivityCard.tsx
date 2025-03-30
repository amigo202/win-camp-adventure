
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
      className="bg-white/10 border-white/20 text-white shadow-md hover:shadow-lg hover:bg-white/20 cursor-pointer transition-all duration-200"
      onClick={handleClick}
    >
      <CardHeader className="bg-white/5 rounded-t-lg pb-1">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <p className={`text-sm text-gray-200 ${isExpanded ? "" : "line-clamp-2"}`} dir="rtl">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
