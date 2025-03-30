
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import activitiesData from '../../utils/activities.json';

const ActivityIdeas: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentActivity, setCurrentActivity] = useState<null | {title: string, description: string}>(null);
  
  // Filter activities based on search term
  const filteredActivities = activitiesData.filter(activity => 
    activity.title.includes(searchTerm) || 
    activity.description.includes(searchTerm)
  );

  const handleRandomActivity = () => {
    const randomIndex = Math.floor(Math.random() * activitiesData.length);
    setCurrentActivity(activitiesData[randomIndex]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">רעיונות לפעילויות גיבוש</h2>
        <Button 
          onClick={handleRandomActivity}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          פעילות אקראית
        </Button>
      </div>

      {currentActivity && (
        <Card className="bg-white/10 border-white/20 text-white shadow-lg mb-6 transition-all duration-300">
          <CardHeader className="bg-white/5 rounded-t-lg pb-3">
            <CardTitle className="text-xl font-bold">{currentActivity.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="whitespace-pre-line">{currentActivity.description}</p>
          </CardContent>
        </Card>
      )}

      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          className="bg-white/10 text-white border-white/30 pr-10"
          placeholder="חיפוש פעילויות..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredActivities.map((activity, index) => (
          <Card 
            key={index} 
            className="bg-white/10 border-white/20 text-white shadow-md hover:shadow-lg hover:bg-white/20 cursor-pointer transition-all duration-200"
            onClick={() => setCurrentActivity(activity)}
          >
            <CardHeader className="bg-white/5 rounded-t-lg pb-1">
              <CardTitle className="text-lg font-bold">{activity.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="line-clamp-2 text-sm text-gray-200">
                {activity.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-8 text-gray-300">
          <p>לא נמצאו פעילויות התואמות את החיפוש</p>
        </div>
      )}
    </div>
  );
};

export default ActivityIdeas;
