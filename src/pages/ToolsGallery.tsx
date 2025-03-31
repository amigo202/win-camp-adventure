
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getCompletedToolsCount, isLoggedIn, isAdmin, isGuide } from '../utils/authUtils';
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
    // Check if the user is logged in and redirect only if they're an admin or guide
    if (isLoggedIn()) {
      if (isAdmin()) {
        navigate('/admin');
      } else if (isGuide()) {
        navigate('/python-course');
      }
      // Students and non-logged-in users stay on the gallery page
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
    <div className="page-container" dir="rtl">
      <StarsBackground />
      
      <div className="max-w-6xl mx-auto">
        <HeaderSection showGuideLogin={() => setShowGuideLogin(true)} />
        
        <ProgressSection 
          completedCount={completedCount} 
          updateCompletedCount={updateCompletedCount}
        />
        
        <div className="p-4 md:p-8 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg mb-8">
          <SearchBar onSelectTool={handleToolSelect} />
        </div>
        
        <CategoriesDisplay onSelectTool={handleToolSelect} />
      </div>
      
      <LoginDialog 
        open={showGuideLogin} 
        onOpenChange={setShowGuideLogin}
      />
      
      <div className="footer-section">
        WIN CAMP &copy; {new Date().getFullYear()} | עולם של הרפתקאות טכנולוגיות
      </div>
    </div>
  );
};

export default ToolsGallery;
