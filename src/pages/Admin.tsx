
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
      // בדיקה אם המשתמש מחובר
      if (!isLoggedIn()) {
        navigate('/login');
        return;
      }

      // בדיקה אם המשתמש מנהל או מדריך
      if (!isAdmin() && !isGuide()) {
        navigate('/');
        return;
      }

      setLoading(false);
    };

    // הרץ בדיקת אימות מידית
    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">טוען...</div>;
  }

  return (
    <div className="min-h-screen py-6 px-4 md:px-8 relative bg-gradient-to-br from-indigo-900 to-indigo-950" dir="rtl">
      <StarsBackground />
      
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <GuideNavigation />

        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-wincamp-blue hover:bg-wincamp-blue/90 text-white px-4 py-2 rounded-md shadow-md transition-colors"
          >
            <Home size={20} />
            מעבר לגלריית הכלים
          </button>
        </div>

        <Tabs defaultValue="guidelines" className="w-full">
          <TabsList className="grid grid-cols-6 mb-8 bg-indigo-700/60 p-1 rounded-xl">
            <TabsTrigger 
              value="guidelines" 
              className="text-white data-[state=active]:bg-indigo-500/80 data-[state=active]:text-white"
            >
              הנחיות למדריכים
            </TabsTrigger>
            <TabsTrigger 
              value="students" 
              className="text-white data-[state=active]:bg-indigo-500/80 data-[state=active]:text-white"
            >
              ניהול תלמידים
            </TabsTrigger>
            <TabsTrigger 
              value="attendance" 
              className="text-white data-[state=active]:bg-indigo-500/80 data-[state=active]:text-white"
            >
              רישום נוכחות
            </TabsTrigger>
            <TabsTrigger 
              value="activity" 
              className="text-white data-[state=active]:bg-indigo-500/80 data-[state=active]:text-white"
            >
              מעקב פעילות
            </TabsTrigger>
            <TabsTrigger 
              value="ideas" 
              className="text-white data-[state=active]:bg-indigo-500/80 data-[state=active]:text-white"
            >
              רעיונות לפעילויות
            </TabsTrigger>
            <TabsTrigger 
              value="materials" 
              className="text-white data-[state=active]:bg-indigo-500/80 data-[state=active]:text-white"
            >
              חומרי לימוד
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="guidelines" className="bg-indigo-700/40 backdrop-blur-sm rounded-lg p-4 border border-indigo-600/50 text-white">
            <InstructorGuidelines />
          </TabsContent>
          
          <TabsContent value="students" className="bg-indigo-700/40 backdrop-blur-sm rounded-lg p-4 border border-indigo-600/50 text-white">
            <StudentManagement />
          </TabsContent>
          
          <TabsContent value="attendance" className="bg-indigo-700/40 backdrop-blur-sm rounded-lg p-4 border border-indigo-600/50 text-white">
            <AttendanceTracker />
          </TabsContent>
          
          <TabsContent value="activity" className="bg-indigo-700/40 backdrop-blur-sm rounded-lg p-4 border border-indigo-600/50 text-white">
            <ActivityMonitor />
          </TabsContent>

          <TabsContent value="ideas" className="bg-indigo-700/40 backdrop-blur-sm rounded-lg p-4 border border-indigo-600/50 text-white">
            <ActivityIdeas />
          </TabsContent>
          
          <TabsContent value="materials" className="bg-indigo-700/40 backdrop-blur-sm rounded-lg p-4 border border-indigo-600/50 text-white">
            <TeachingMaterials />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
