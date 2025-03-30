
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, LayoutDashboard, Users, BookOpen } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { isGuide, isAdmin } from '../utils/authUtils';

const GuideNavigation: React.FC = () => {
  const navigate = useNavigate();
  const isUserGuide = isGuide();
  const isUserAdmin = isAdmin();

  if (!isUserGuide && !isUserAdmin) {
    return null;
  }

  return (
    <div className="bg-indigo-900/80 text-white py-3 px-6 flex justify-between items-center glass-card rounded-lg mb-4" dir="rtl">
      <div className="text-lg font-bold">ממשק מדריך</div>
      
      <NavigationMenu dir="rtl">
        <NavigationMenuList className="gap-2">
          <NavigationMenuItem>
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-white/20"
              onClick={() => navigate('/dashboard')}
            >
              <LayoutDashboard className="ml-2" size={16} />
              דף ראשי
            </Button>
          </NavigationMenuItem>
          
          {isUserAdmin && (
            <NavigationMenuItem>
              <Button 
                variant="outline" 
                className="text-white border-white hover:bg-white/20"
                onClick={() => navigate('/admin')}
              >
                <Users className="ml-2" size={16} />
                ניהול קייטנה
              </Button>
            </NavigationMenuItem>
          )}
          
          <NavigationMenuItem>
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-white/20"
              onClick={() => navigate('/python-course')}
            >
              <BookOpen className="ml-2" size={16} />
              קורס פייתון
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default GuideNavigation;
