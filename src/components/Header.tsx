
import React from 'react';
import { getCurrentUser, logoutUser } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Star } from 'lucide-react';

interface HeaderProps {
  showLogout?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showLogout = true }) => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  
  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };
  
  return (
    <header 
      className="w-full py-4 px-6 flex justify-between items-center glass-card mb-6 rounded-xl relative overflow-hidden"
      style={{ 
        backgroundImage: `url('/lovable-uploads/0347bba2-2b30-4c5c-9c4f-abc081a81785.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-indigo-900/60 backdrop-blur-sm"></div>
      
      <div className="flex items-center justify-between w-full relative z-10">
        <div className="flex items-center">
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-wincamp-yellow to-wincamp-orange mr-2 animate-pulse-glow">
            WIN CAMP
          </div>
          <div className="text-sm text-white">עולם של תכנות, יצירה, בינה מלאכותית וכיף!</div>
        </div>
        
        {showLogout && user && (
          <div className="flex items-center">
            <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
              <Star className="text-wincamp-yellow ml-2" size={16} />
              <span className="text-white text-sm ml-2">{user.displayName}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="mr-2 bg-white/20 hover:bg-white/30 text-white text-sm px-4 py-1 rounded-full transition-all backdrop-blur-sm"
            >
              התנתק
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
