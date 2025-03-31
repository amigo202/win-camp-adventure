
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
      className="w-full py-6 px-8 flex justify-between items-center bg-white/70 backdrop-blur-sm rounded-xl shadow-lg mb-6 relative overflow-hidden"
      style={{ 
        backgroundImage: `url('/lovable-uploads/0347bba2-2b30-4c5c-9c4f-abc081a81785.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* אפקט שקיפות כדי שהטקסט יהיה קריא */}
      <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm"></div>
      
      <div className="flex items-center relative z-10">
        <Zap className="text-wincamp-yellow mr-2" size={28} />
        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-wincamp-yellow to-wincamp-orange mr-2 animate-pulse-glow">
          WIN CAMP
        </div>
        <div className="text-lg text-white">עולם של תכנות, יצירה, בינה מלאכותית וכיף!</div>
      </div>
      
      {showLogout && user && (
        <div className="flex items-center relative z-10">
          <Sparkles className="text-wincamp-orange ml-2" size={20} />
          <span className="text-white text-lg ml-3">שלום, {user.displayName}!</span>
          <button 
            onClick={handleLogout}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-xl ml-3 transition-all hover:scale-105 backdrop-blur-sm shadow-md"
          >
            התנתק
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
