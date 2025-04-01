
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, getCurrentUser, isAdmin, isGuide } from '../utils/authUtils';
import Header from '../components/Header';
import GuideNavigation from '../components/GuideNavigation';
import StarsBackground from '../components/StarsBackground';
import AdminHeader from '../components/admin/AdminHeader';
import AdminTabs from '../components/admin/AdminTabs';

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

        <AdminHeader />
        
        <AdminTabs />
      </div>
    </div>
  );
};

export default Admin;
