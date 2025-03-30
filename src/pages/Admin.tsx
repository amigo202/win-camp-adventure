
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, getCurrentUser } from '../utils/authUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentManagement from '../components/admin/StudentManagement';
import AttendanceTracker from '../components/admin/AttendanceTracker';
import ActivityMonitor from '../components/admin/ActivityMonitor';
import ActivityIdeas from '../components/admin/ActivityIdeas';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ודא שהמשתמש מחובר
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    // בדיקה פשוטה האם זה מדריך (בגרסה עתידית אפשר להוסיף תפקידים)
    const user = getCurrentUser();
    if (user?.username !== 'WINCAMP') {
      navigate('/dashboard');
      return;
    }

    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen" dir="rtl">טוען...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-800 text-white p-4 md:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">ממשק ניהול קייטנת WIN CAMP</h1>
          <Button variant="outline" onClick={() => navigate('/dashboard')} className="text-white border-white hover:bg-white/20">
            <ChevronLeft className="ml-2" size={16} />
            חזרה לדשבורד
          </Button>
        </div>

        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="students">ניהול תלמידים</TabsTrigger>
            <TabsTrigger value="attendance">רישום נוכחות</TabsTrigger>
            <TabsTrigger value="activity">מעקב פעילות</TabsTrigger>
            <TabsTrigger value="ideas">רעיונות לפעילויות</TabsTrigger>
          </TabsList>
          
          <TabsContent value="students" className="bg-white/10 rounded-lg p-4">
            <StudentManagement />
          </TabsContent>
          
          <TabsContent value="attendance" className="bg-white/10 rounded-lg p-4">
            <AttendanceTracker />
          </TabsContent>
          
          <TabsContent value="activity" className="bg-white/10 rounded-lg p-4">
            <ActivityMonitor />
          </TabsContent>

          <TabsContent value="ideas" className="bg-white/10 rounded-lg p-4">
            <ActivityIdeas />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
