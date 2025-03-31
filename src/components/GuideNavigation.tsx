
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users } from 'lucide-react';
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

  return (
    <div className="bg-indigo-800/70 text-white py-4 px-6 flex justify-between items-center rounded-lg mb-6 shadow-lg border border-white/10" dir="rtl">
      <div className="text-xl font-bold">ממשק מדריך - {user?.displayName}</div>
      
      <NavigationMenu dir="rtl">
        <NavigationMenuList className="gap-3">
          <NavigationMenuItem>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 hover:text-white text-base font-bold shadow-md"
              asChild
            >
              <Link to="/">
                <LayoutDashboard className="ml-2" size={18} />
                דף ראשי
              </Link>
            </Button>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 hover:text-white text-base font-bold shadow-md"
              onClick={() => navigate('/admin')}
            >
              <Users className="ml-2" size={18} />
              ניהול קייטנה
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default GuideNavigation;
