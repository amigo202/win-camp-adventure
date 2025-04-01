
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, isAdmin } from '../utils/authUtils';
import { Tool } from '../utils/data';
import StarsBackground from '../components/StarsBackground';
import SearchBar from '../components/SearchBar';
import HeaderSection from '../components/gallery/HeaderSection';
import ProgressSection from '../components/gallery/ProgressSection';
import CategoriesDisplay from '../components/gallery/CategoriesDisplay';
import LoginDialog from '../components/guide/LoginDialog';

const ToolsGallery: React.FC = () => {
  const navigate = useNavigate();
  const [showGuideLogin, setShowGuideLogin] = React.useState(false);
  
  useEffect(() => {
    if (isLoggedIn() && isAdmin()) {
      navigate('/admin');
    }
  }, [navigate]);
  
  const handleToolSelect = (tool: Tool) => {
    const element = document.getElementById(`category-${tool.category}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      
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
        
        <ProgressSection />
        
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

