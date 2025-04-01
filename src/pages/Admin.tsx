
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { isLoggedIn, getCurrentUser, isAdmin, isGuide } from '../utils/authUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentManagement from '../components/admin/StudentManagement';
import AttendanceTracker from '../components/admin/AttendanceTracker';
import ActivityMonitor from '../components/admin/ActivityMonitor';
import ActivityIdeas from '../components/admin/ActivityIdeas';
import TeachingMaterials from '../components/admin/TeachingMaterials';
import InstructorGuidelines from '../components/admin/InstructorGuidelines';
import Header from '../components/Header';
import GuideNavigation from '../components/GuideNavigation';
import StarsBackground from '../components/StarsBackground';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (!isLoggedIn()) {
        navigate('/login');
        return;
      }

      if (!isAdmin() && !isGuide()) {
        navigate('/');
        return;
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-gray-800">טוען...</div>;
  }

  return (
    <div className="min-h-screen py-6 px-4 md:px-8 relative bg-gradient-to-br from-slate-50 via-indigo-50 to-white" dir="rtl">
      <StarsBackground />
      
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <GuideNavigation />

        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md shadow-md transition-colors"
          >
            <Home size={20} />
            מעבר לגלריית הכלים
          </button>
        </div>

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
      </div>
    </div>
  );
};

export default Admin;
