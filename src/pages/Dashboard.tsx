
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, getCurrentUser, getCompletedToolsCount, resetCompletedTools, isGuide, isAdmin } from '../utils/authUtils';
import { categories, getToolsByCategory, Tool } from '../utils/data';
import Header from '../components/Header';
import GuideNavigation from '../components/GuideNavigation';
import CategorySection from '../components/CategorySection';
import SearchBar from '../components/SearchBar';
import StarsBackground from '../components/StarsBackground';
import { toast } from '../components/ui/use-toast';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [completedCount, setCompletedCount] = useState(0);
  
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }
    
    updateCompletedCount();
    
    // Check completed count every second in case it changes from a tool card
    const interval = setInterval(updateCompletedCount, 1000);
    return () => clearInterval(interval);
  }, [navigate]);
  
  const updateCompletedCount = () => {
    setCompletedCount(getCompletedToolsCount());
  };
  
  const handleResetProgress = () => {
    if (window.confirm('האם אתה בטוח שברצונך לאפס את כל ההתקדמות?')) {
      resetCompletedTools();
      updateCompletedCount();
      toast({
        title: "ההתקדמות אופסה",
        description: "כל הפעילויות סומנו כלא הושלמו",
      });
    }
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
  
  const user = getCurrentUser();
  const showGuideNav = isGuide() || isAdmin();
  
  return (
    <div className="min-h-screen py-6 px-4 md:px-8 relative" dir="rtl">
      <StarsBackground />
      
      <div className="max-w-6xl mx-auto">
        <Header />
        
        {showGuideNav && <GuideNavigation />}
        
        <div className="glass-card rounded-xl p-6 mb-8 animate-slide-in-bottom">
          <h1 className="text-2xl font-bold mb-2">
            שלום {user?.displayName}! מה בא לך ללמוד היום?
          </h1>
          
          <div className="flex flex-wrap justify-between items-center">
            <div className="text-wincamp-purple">
              <span className="font-bold">{completedCount}</span> פעילויות הושלמו מתוך {categories.reduce((acc, cat) => acc + getToolsByCategory(cat.id).length, 0)}
            </div>
            
            <button 
              onClick={handleResetProgress}
              className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-lg transition-all"
            >
              אפס התקדמות
            </button>
          </div>
        </div>
        
        <SearchBar onSelectTool={handleToolSelect} />
        
        {categories.map((category) => (
          <div id={`category-${category.id}`} key={category.id}>
            <CategorySection 
              category={category} 
              tools={getToolsByCategory(category.id)} 
            />
          </div>
        ))}
      </div>
      
      <div className="mt-10 text-center text-gray-500 text-sm">
        WIN CAMP &copy; {new Date().getFullYear()} | עולם של הרפתקאות טכנולוגיות
      </div>
    </div>
  );
};

export default Dashboard;
