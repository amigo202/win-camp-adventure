
import React from 'react';
import { getCurrentUser, logoutUser } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap } from 'lucide-react';

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
      {/* אפקט שקיפות כדי שהטקסט יהיה קריא */}
      <div className="absolute inset-0 bg-indigo-900/60 backdrop-blur-sm"></div>
      
      <div className="flex items-center relative z-10">
        <Zap className="text-wincamp-yellow mr-2" size={24} />
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-wincamp-yellow to-wincamp-orange mr-2 animate-pulse-glow">
          WIN CAMP
        </div>
        <div className="text-sm text-white">עולם של תכנות, יצירה, בינה מלאכותית וכיף!</div>
      </div>
      
      {showLogout && user && (
        <div className="flex items-center relative z-10">
          <Sparkles className="text-wincamp-orange ml-2" size={18} />
          <span className="text-white ml-2">שלום, {user.displayName}!</span>
          <button 
            onClick={handleLogout}
            className="bg-white/20 hover:bg-white/30 text-white text-sm px-4 py-1 rounded-full transition-all backdrop-blur-sm"
          >
            התנתק
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
