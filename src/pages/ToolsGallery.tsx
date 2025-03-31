
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, getCurrentUser, getCompletedToolsCount, resetCompletedTools, isLoggedIn } from '../utils/authUtils';
import { categories, getToolsByCategory, Tool } from '../utils/data';
import Header from '../components/Header';
import GuideNavigation from '../components/GuideNavigation';
import CategorySection from '../components/CategorySection';
import SearchBar from '../components/SearchBar';
import StarsBackground from '../components/StarsBackground';
import { toast } from '../components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen } from 'lucide-react';

const ToolsGallery: React.FC = () => {
  const navigate = useNavigate();
  const [completedCount, setCompletedCount] = React.useState(0);
  const [showGuideLogin, setShowGuideLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // If the user is already logged in as a guide or admin, redirect them
    if (isLoggedIn()) {
      const user = getCurrentUser();
      if (user?.role === 'admin') {
        navigate('/admin');
      } else if (user?.role === 'instructor') {
        navigate('/python-course');
      }
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

  const handleGuideLogin = () => {
    setLoading(true);
    
    setTimeout(() => {
      const user = loginUser(username, password);
      
      if (user && (user.role === 'instructor' || user.role === 'admin')) {
        toast({
          title: "התחברת בהצלחה!",
          description: `ברוך הבא, ${user.displayName}!`,
        });
        
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/python-course');
        }
      } else {
        toast({
          title: "התחברות נכשלה",
          description: "שם משתמש או סיסמה לא נכונים",
          variant: "destructive",
        });
      }
      
      setLoading(false);
    }, 800); // Simulate network request
  };
  
  return (
    <div className="min-h-screen py-6 px-4 md:px-8 relative" dir="rtl">
      <StarsBackground />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <Header showLogout={false} />
          <Button 
            variant="outline" 
            className="bg-orange-500 hover:bg-orange-600 text-white border-0"
            onClick={() => setShowGuideLogin(true)}
          >
            <BookOpen className="ml-2" />
            כניסת מדריכים
          </Button>
        </div>
        
        <div className="glass-card rounded-xl p-6 mb-8 animate-slide-in-bottom">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">
            WIN CAMP - עולם של כלים ותוכנות
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
      
      <Dialog open={showGuideLogin} onOpenChange={setShowGuideLogin}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right">כניסת מדריכים</DialogTitle>
            <DialogDescription className="text-right">
              הזן שם משתמש וסיסמה כדי להיכנס לממשק המדריך
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-right block">שם משתמש</Label>
              <Input
                id="username"
                placeholder="WINCAMP100"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-right block">סיסמה</Label>
              <Input
                id="password"
                type="password"
                placeholder="12345"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-right"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button 
              onClick={handleGuideLogin} 
              disabled={loading} 
              className="bg-orange-500 hover:bg-orange-600 text-white border-0"
            >
              {loading ? "מתחבר..." : "התחבר"}
            </Button>
          </div>
          
          <div className="mt-4 text-sm text-gray-500 text-center">
            למדריכים: שם משתמש = WINCAMP100 או WINCAMP200, סיסמה = 12345
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="mt-10 text-center text-gray-500 text-sm">
        WIN CAMP &copy; {new Date().getFullYear()} | עולם של הרפתקאות טכנולוגיות
      </div>
    </div>
  );
};

export default ToolsGallery;
