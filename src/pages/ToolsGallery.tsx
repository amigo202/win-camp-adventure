
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getCompletedToolsCount, isLoggedIn, isAdmin } from '../utils/authUtils';
import { Tool } from '../utils/data';
import StarsBackground from '../components/StarsBackground';
import SearchBar from '../components/SearchBar';
import HeaderSection from '../components/gallery/HeaderSection';
import ProgressSection from '../components/gallery/ProgressSection';
import CategoriesDisplay from '../components/gallery/CategoriesDisplay';
import LoginDialog from '../components/guide/LoginDialog';

const ToolsGallery: React.FC = () => {
  const navigate = useNavigate();
  const [completedCount, setCompletedCount] = useState(0);
  const [showGuideLogin, setShowGuideLogin] = useState(false);
  
  useEffect(() => {
    // If the user is already logged in as an admin, redirect them
    if (isLoggedIn() && isAdmin()) {
      navigate('/admin');
    }
    
    updateCompletedCount();
    
    // Check completed count every second in case it changes from a tool card
    const interval = setInterval(updateCompletedCount, 1000);
    return () => clearInterval(interval);
  }, [navigate]);
  
  const updateCompletedCount = () => {
    setCompletedCount(getCompletedToolsCount());
  };
  
  const handleToolSelect = (tool: Tool) => {
    const element = document.getElementById(`category-${tool.category}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Highlight the tool card briefly
      setTimeout(() => {
        const toolElement = document.getElementById(`tool-${tool.id}`);
        if (toolElement) {
          toolElement.classList.add('ring-4', 'ring-wincamp-yellow');
          setTimeout(() => {
            toolElement.classList.remove('ring-4', 'ring-wincamp-yellow');
          }, 2000);
        }
      }, 500);
    }
  };
  
  return (
    <div className="min-h-screen py-6 px-4 md:px-8 relative" dir="rtl">
      <StarsBackground />
      
      <div className="max-w-6xl mx-auto">
        <HeaderSection showGuideLogin={() => setShowGuideLogin(true)} />
        
        <ProgressSection 
          completedCount={completedCount} 
          updateCompletedCount={updateCompletedCount}
        />
        
        <SearchBar onSelectTool={handleToolSelect} />
        
        <CategoriesDisplay onSelectTool={handleToolSelect} />
      </div>
      
      <LoginDialog 
        open={showGuideLogin} 
        onOpenChange={setShowGuideLogin} 
      />
      
      <div className="mt-10 text-center text-gray-500 text-sm">
        WIN CAMP &copy; {new Date().getFullYear()} | עולם של הרפתקאות טכנולוגיות
      </div>
    </div>
  );
};

export default ToolsGallery;
