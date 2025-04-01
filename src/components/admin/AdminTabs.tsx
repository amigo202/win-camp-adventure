
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentManagement from './StudentManagement';
import AttendanceTracker from './AttendanceTracker';
import ActivityMonitor from './ActivityMonitor';
import ActivityIdeas from './ActivityIdeas';
import TeachingMaterials from './TeachingMaterials';
import InstructorGuidelines from './InstructorGuidelines';

const AdminTabs: React.FC = () => {
  return (
    <Tabs defaultValue="guidelines" className="w-full">
      <TabsList className="grid grid-cols-6 mb-8 bg-indigo-200/60 p-1 rounded-xl">
        <TabsTrigger 
          value="guidelines" 
          className="text-gray-800 data-[state=active]:bg-indigo-400/80 data-[state=active]:text-white"
        >
          הנחיות למדריכים
        </TabsTrigger>
        <TabsTrigger 
          value="students" 
          className="text-gray-800 data-[state=active]:bg-indigo-400/80 data-[state=active]:text-white"
        >
          ניהול תלמידים
        </TabsTrigger>
        <TabsTrigger 
          value="attendance" 
          className="text-gray-800 data-[state=active]:bg-indigo-400/80 data-[state=active]:text-white"
        >
          רישום נוכחות
        </TabsTrigger>
        <TabsTrigger 
          value="activity" 
          className="text-gray-800 data-[state=active]:bg-indigo-400/80 data-[state=active]:text-white"
        >
          מעקב פעילות
        </TabsTrigger>
        <TabsTrigger 
          value="ideas" 
          className="text-gray-800 data-[state=active]:bg-indigo-400/80 data-[state=active]:text-white"
        >
          רעיונות לפעילויות
        </TabsTrigger>
        <TabsTrigger 
          value="materials" 
          className="text-gray-800 data-[state=active]:bg-indigo-400/80 data-[state=active]:text-white"
        >
          חומרי לימוד
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="guidelines" className="bg-white/80 backdrop-blur-md shadow-xl rounded-lg p-4 border border-slate-200 text-gray-900">
        <InstructorGuidelines />
      </TabsContent>
      
      <TabsContent value="students" className="bg-white/80 backdrop-blur-md shadow-xl rounded-lg p-4 border border-slate-200 text-gray-900">
        <StudentManagement />
      </TabsContent>
      
      <TabsContent value="attendance" className="bg-white/80 backdrop-blur-md shadow-xl rounded-lg p-4 border border-slate-200 text-gray-900">
        <AttendanceTracker />
      </TabsContent>
      
      <TabsContent value="activity" className="bg-white/80 backdrop-blur-md shadow-xl rounded-lg p-4 border border-slate-200 text-gray-900">
        <ActivityMonitor />
      </TabsContent>

      <TabsContent value="ideas" className="bg-white/80 backdrop-blur-md shadow-xl rounded-lg p-4 border border-slate-200 text-gray-900">
        <ActivityIdeas />
      </TabsContent>
      
      <TabsContent value="materials" className="bg-white/80 backdrop-blur-md shadow-xl rounded-lg p-4 border border-slate-200 text-gray-900">
        <TeachingMaterials />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
