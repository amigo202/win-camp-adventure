
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { isLoggedIn, getCurrentUser, isAdmin, isGuide } from '../utils/authUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentManagement from '../components/admin/StudentManagement';
import AttendanceTracker from '../components/admin/AttendanceTracker';
import ActivityMonitor from '../components/admin/ActivityMonitor';
import ActivityIdeas from '../components/admin/ActivityIdeas';
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
    return <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50" dir="rtl">
      <div className="text-xl bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6">טוען...</div>
    </div>;
  }

  return (
    <div className="min-h-screen py-6 px-4 md:px-8 relative bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50" dir="rtl">
      <StarsBackground />
      
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <GuideNavigation />

        <div className="mb-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition-all hover:scale-105"
          >
            <Home size={20} />
            מעבר לגלריית הכלים
          </button>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg animate-slide-in-bottom">
          <h1 className="text-4xl font-bold text-blue-900">ממשק ניהול קייטנת WIN CAMP</h1>
        </div>

        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8 bg-white/70 p-1 rounded-xl shadow-md">
            <TabsTrigger 
              value="students" 
              className="text-blue-800 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg px-4 py-2 transition-all"
            >
              ניהול תלמידים
            </TabsTrigger>
            <TabsTrigger 
              value="attendance" 
              className="text-blue-800 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg px-4 py-2 transition-all"
            >
              רישום נוכחות
            </TabsTrigger>
            <TabsTrigger 
              value="activity" 
              className="text-blue-800 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg px-4 py-2 transition-all"
            >
              מעקב פעילות
            </TabsTrigger>
            <TabsTrigger 
              value="ideas" 
              className="text-blue-800 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg px-4 py-2 transition-all"
            >
              רעיונות לפעילויות
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="students" className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-100 shadow-lg">
            <StudentManagement />
          </TabsContent>
          
          <TabsContent value="attendance" className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-100 shadow-lg">
            <AttendanceTracker />
          </TabsContent>
          
          <TabsContent value="activity" className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-100 shadow-lg">
            <ActivityMonitor />
          </TabsContent>

          <TabsContent value="ideas" className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-100 shadow-lg">
            <ActivityIdeas />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
