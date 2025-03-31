
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wrench } from 'lucide-react';
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

  if (!isUserGuide && !isUserAdmin) {
    return null;
  }

  return (
    <div 
      className="relative overflow-hidden text-white py-4 px-6 flex justify-between items-center rounded-xl mb-6 shadow-lg border border-white/10 w-full max-w-7xl mx-auto"
      style={{ 
        backgroundImage: `url('/lovable-uploads/0347bba2-2b30-4c5c-9c4f-abc081a81785.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      dir="rtl"
    >
      <div className="absolute inset-0 bg-indigo-900/70 backdrop-blur-sm"></div>
      
      <div className="text-xl font-bold relative z-10 flex items-center">
        <div className="ml-2 text-wincamp-orange">🌟</div>
        ממשק מדריך - {user?.displayName}
      </div>
      
      <NavigationMenu dir="rtl" className="relative z-10">
        <NavigationMenuList className="gap-3">
          <NavigationMenuItem>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 hover:text-white text-base font-bold shadow-md backdrop-blur-sm rounded-xl hover:scale-105 transition-all"
              onClick={() => navigate('/')}
            >
              <Wrench className="ml-2" size={18} />
              גלריית הכלים
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default GuideNavigation;
