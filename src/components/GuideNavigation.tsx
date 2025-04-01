
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wrench, BookOpen, BookOpenCheck } from 'lucide-react';
import { isGuide, isAdmin, getCurrentUser } from '../utils/authUtils';

const GuideNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isUserGuide = isGuide();
  const isUserAdmin = isAdmin();
  const user = getCurrentUser();

  if (!isUserGuide && !isUserAdmin) {
    return null;
  }

  const navItems = [
    { 
      label: "הנחיות למדריכים", 
      icon: <BookOpenCheck className="ml-2" size={18} />, 
      onClick: () => {
        navigate('/admin');
        setTimeout(() => {
          const tab = document.querySelector('[value="guidelines"]') as HTMLElement;
          if (tab) tab.click();
        }, 100);
      }
    },
    { 
      label: "גלריית הכלים", 
      icon: <Wrench className="ml-2" size={18} />,
      onClick: () => navigate('/')
    },
    { 
      label: "חומרי לימוד", 
      icon: <BookOpen className="ml-2" size={18} />,
      onClick: () => {
        navigate('/admin');
        setTimeout(() => {
          const tab = document.querySelector('[value="materials"]') as HTMLElement;
          if (tab) tab.click();
        }, 100);
      }
    }
  ];

  return (
    <div 
      className="relative overflow-hidden text-white py-4 px-6 rounded-xl mb-6 shadow-lg border border-white/10 w-full max-w-7xl mx-auto"
      style={{ 
        backgroundImage: `url('/lovable-uploads/0347bba2-2b30-4c5c-9c4f-abc081a81785.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-indigo-900/70 backdrop-blur-sm"></div>
      
      <div className="flex justify-between items-center relative z-10">
        <div className="text-xl font-bold flex items-center">
          <div className="ml-2 text-wincamp-yellow">🌟</div>
          ממשק מדריך - {user?.displayName}
        </div>
        
        <div className="flex gap-3">
          {navItems.map((item, index) => (
            <Button 
              key={index}
              variant="outline" 
              size="sm"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 hover:text-white font-bold shadow-md backdrop-blur-sm rounded-xl hover:scale-105 transition-all"
              onClick={item.onClick}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuideNavigation;
