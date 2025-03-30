
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SearchBar from './activities/SearchBar';
import ActivityCard from './activities/ActivityCard';
import FeaturedActivity from './activities/FeaturedActivity';
import activitiesData from '../../utils/activities.json';
import { Activity } from '@/types/activity';

const ActivityIdeas: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  
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

      <FeaturedActivity activity={currentActivity} />

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredActivities.map((activity, index) => (
          <ActivityCard
            key={index}
            title={activity.title}
            description={activity.description}
            onClick={() => setCurrentActivity(activity)}
          />
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
