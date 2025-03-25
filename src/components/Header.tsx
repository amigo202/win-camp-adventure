
import React from 'react';
import { getCurrentUser, logoutUser } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  showLogout?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showLogout = true }) => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  
  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };
  
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center glass-card mb-6 rounded-xl">
      <div className="flex items-center">
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-wincamp-purple to-wincamp-blue mr-2 animate-pulse-glow">
          WIN CAMP
        </div>
        <div className="text-sm text-gray-600">עולם של תכנות, יצירה, בינה מלאכותית וכיף!</div>
      </div>
      
      {showLogout && user && (
        <div className="flex items-center">
          <span className="text-wincamp-purple ml-2">שלום, {user.displayName}!</span>
          <button 
            onClick={handleLogout}
            className="bg-wincamp-purple/10 hover:bg-wincamp-purple/20 text-wincamp-purple text-sm px-4 py-1 rounded-full transition-all"
          >
            התנתק
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
