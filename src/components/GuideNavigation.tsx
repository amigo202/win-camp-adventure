
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
      </div>
    </div>
  );
};

export default GuideNavigation;
