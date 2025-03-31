
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from '@/types/activity';

interface FeaturedActivityProps {
  activity: Activity | null;
}

const FeaturedActivity: React.FC<FeaturedActivityProps> = ({ activity }) => {
  if (!activity) return null;
  
  return (
    <Card className="bg-indigo-800/30 border-indigo-500/50 text-white shadow-lg mb-6 transition-all duration-300 backdrop-blur-sm">
      <CardHeader className="bg-indigo-800/40 rounded-t-lg pb-3 border-b border-indigo-600/30">
        <CardTitle className="text-xl font-bold text-white">{activity.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="whitespace-pre-line text-white" dir="rtl">{activity.description}</p>
      </CardContent>
    </Card>
  );
};

export default FeaturedActivity;
