
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, Sparkles, Zap } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from '@/components/ui/navigation-menu';
import { isGuide, isAdmin, getCurrentUser } from '../utils/authUtils';

const GuideNavigation: React.FC = () => {
  const navigate = useNavigate();
  const isUserGuide = isGuide();
  const isUserAdmin = isAdmin();
  const user = getCurrentUser();

  // רק להציג את התפריט הזה למדריכים או מנהלים
  if (!isUserGuide && !isUserAdmin) {
    return null;
  }

  const handleNavigateToHome = () => {
    navigate('/');
  };

  return (
    <div 
      className="relative overflow-hidden text-white py-6 px-8 flex flex-wrap md:flex-nowrap justify-between items-center rounded-xl mb-6 shadow-lg border border-white/10 bg-white/10 backdrop-blur-sm"
      style={{ 
        backgroundImage: `url('/lovable-uploads/0347bba2-2b30-4c5c-9c4f-abc081a81785.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      dir="rtl"
    >
      {/* אפקט שקיפות כדי שהטקסט יהיה קריא */}
      <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm"></div>
      
      <div className="text-xl md:text-2xl font-bold relative z-10 flex items-center w-full md:w-auto mb-4 md:mb-0 justify-center md:justify-start">
        <Sparkles className="text-wincamp-orange ml-3" size={24} />
        ממשק מדריך - {user?.displayName}
      </div>
      
      <NavigationMenu dir="rtl" className="relative z-10 w-full md:w-auto">
        <NavigationMenuList className="gap-4 flex flex-wrap md:flex-nowrap justify-center">
          <NavigationMenuItem>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 hover:text-white text-lg font-bold shadow-md backdrop-blur-sm px-6 py-3 rounded-xl transition-all hover:scale-105 w-full md:w-auto"
              onClick={handleNavigateToHome}
            >
              <LayoutDashboard className="ml-2" size={20} />
              דף ראשי
            </Button>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 hover:text-white text-lg font-bold shadow-md backdrop-blur-sm px-6 py-3 rounded-xl transition-all hover:scale-105 w-full md:w-auto"
              onClick={() => navigate('/admin')}
            >
              <Users className="ml-2" size={20} />
              ניהול קייטנה
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default GuideNavigation;
