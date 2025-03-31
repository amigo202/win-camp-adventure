
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, getCurrentUser, isAdmin } from '../utils/authUtils';
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
    // Check if user is logged in
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    // Check if user is admin
    if (!isAdmin()) {
      // If not admin, redirect to appropriate page
      navigate('/python-course');
      return;
    }

    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen" dir="rtl">טוען...</div>;
  }

  return (
    <div className="min-h-screen py-6 px-4 md:px-8 relative" dir="rtl">
      <StarsBackground />
      
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <GuideNavigation />

        <div className="glass-card rounded-xl p-6 mb-8 animate-slide-in-bottom">
          <h1 className="text-3xl font-bold">ממשק ניהול קייטנת WIN CAMP</h1>
        </div>

        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="students">ניהול תלמידים</TabsTrigger>
            <TabsTrigger value="attendance">רישום נוכחות</TabsTrigger>
            <TabsTrigger value="activity">מעקב פעילות</TabsTrigger>
            <TabsTrigger value="ideas">רעיונות לפעילויות</TabsTrigger>
          </TabsList>
          
          <TabsContent value="students" className="bg-white/10 glass-card rounded-lg p-4">
            <StudentManagement />
          </TabsContent>
          
          <TabsContent value="attendance" className="bg-white/10 glass-card rounded-lg p-4">
            <AttendanceTracker />
          </TabsContent>
          
          <TabsContent value="activity" className="bg-white/10 glass-card rounded-lg p-4">
            <ActivityMonitor />
          </TabsContent>

          <TabsContent value="ideas" className="bg-white/10 glass-card rounded-lg p-4">
            <ActivityIdeas />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
