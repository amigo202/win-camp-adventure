
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
    <Tabs defaultValue="students" className="w-full">
      <TabsList className="grid grid-cols-6 mb-8 bg-white/80 p-2 rounded-xl shadow-md border border-indigo-100">
        <TabsTrigger 
          value="guidelines" 
          className="text-indigo-700 data-[state=active]:bg-indigo-600 data-[state=active]:text-white shadow-sm"
        >
          הנחיות למדריכים
        </TabsTrigger>
        <TabsTrigger 
          value="students" 
          className="text-indigo-700 data-[state=active]:bg-indigo-600 data-[state=active]:text-white shadow-sm"
        >
          ניהול תלמידים
        </TabsTrigger>
        <TabsTrigger 
          value="attendance" 
          className="text-indigo-700 data-[state=active]:bg-indigo-600 data-[state=active]:text-white shadow-sm"
        >
          רישום נוכחות
        </TabsTrigger>
        <TabsTrigger 
          value="activity" 
          className="text-indigo-700 data-[state=active]:bg-indigo-600 data-[state=active]:text-white shadow-sm"
        >
          מעקב פעילות
        </TabsTrigger>
        <TabsTrigger 
          value="ideas" 
          className="text-indigo-700 data-[state=active]:bg-indigo-600 data-[state=active]:text-white shadow-sm"
        >
          רעיונות לפעילויות
        </TabsTrigger>
        <TabsTrigger 
          value="materials" 
          className="text-indigo-700 data-[state=active]:bg-indigo-600 data-[state=active]:text-white shadow-sm"
        >
          חומרי לימוד
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="guidelines" className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 border border-slate-200 text-gray-900">
        <InstructorGuidelines />
      </TabsContent>
      
      <TabsContent value="students" className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 border border-slate-200 text-gray-900">
        <StudentManagement />
      </TabsContent>
      
      <TabsContent value="attendance" className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 border border-slate-200 text-gray-900">
        <AttendanceTracker />
      </TabsContent>
      
      <TabsContent value="activity" className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 border border-slate-200 text-gray-900">
        <ActivityMonitor />
      </TabsContent>

      <TabsContent value="ideas" className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 border border-slate-200 text-gray-900">
        <ActivityIdeas />
      </TabsContent>
      
      <TabsContent value="materials" className="bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-4 border border-slate-200 text-gray-900">
        <TeachingMaterials />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
