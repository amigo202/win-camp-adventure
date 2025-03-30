
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, BookOpen } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from '@/components/ui/navigation-menu';
import { isGuide, isAdmin, isStudent } from '../utils/authUtils';

const GuideNavigation: React.FC = () => {
  const navigate = useNavigate();
  const isUserGuide = isGuide();
  const isUserAdmin = isAdmin();
  const isUserStudent = isStudent();

  // Don't show this navigation for students
  if (isUserStudent) {
    return null;
  }

  // Only show this navigation for guides or admins
  if (!isUserGuide && !isUserAdmin) {
    return null;
  }

  return (
    <div className="bg-indigo-900 text-white py-4 px-6 flex justify-between items-center rounded-lg mb-6 shadow-lg" dir="rtl">
      <div className="text-xl font-bold">ממשק מדריך</div>
      
      <NavigationMenu dir="rtl">
        <NavigationMenuList className="gap-3">
          <NavigationMenuItem>
            <Button 
              variant="outline" 
              size="lg"
              className="text-white border-white hover:bg-white/30 text-base font-bold"
              onClick={() => navigate('/dashboard')}
            >
              <LayoutDashboard className="ml-2" size={18} />
              דף ראשי
            </Button>
          </NavigationMenuItem>
          
          {isUserAdmin && (
            <NavigationMenuItem>
              <Button 
                variant="outline" 
                size="lg"
                className="text-white border-white hover:bg-white/30 text-base font-bold"
                onClick={() => navigate('/admin')}
              >
                <Users className="ml-2" size={18} />
                ניהול קייטנה
              </Button>
            </NavigationMenuItem>
          )}
          
          <NavigationMenuItem>
            <Button 
              variant="outline" 
              size="lg"
              className="text-white border-white hover:bg-white/30 text-base font-bold"
              onClick={() => navigate('/python-course')}
            >
              <BookOpen className="ml-2" size={18} />
              קורס פייתון
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default GuideNavigation;
