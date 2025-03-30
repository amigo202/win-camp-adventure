
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from '@/types/activity';

interface FeaturedActivityProps {
  activity: Activity | null;
}

const FeaturedActivity: React.FC<FeaturedActivityProps> = ({ activity }) => {
  if (!activity) return null;
  
  return (
    <Card className="bg-white/10 border-white/20 text-white shadow-lg mb-6 transition-all duration-300">
      <CardHeader className="bg-white/5 rounded-t-lg pb-3">
        <CardTitle className="text-xl font-bold">{activity.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="whitespace-pre-line" dir="rtl">{activity.description}</p>
      </CardContent>
    </Card>
  );
};

export default FeaturedActivity;
