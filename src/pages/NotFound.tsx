
import React from 'react';
import { Link } from 'react-router-dom';
import StarsBackground from '../components/StarsBackground';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative" dir="rtl">
      <StarsBackground />
      
      <div className="text-center glass-card p-10 rounded-xl animate-float">
        <div className="text-8xl mb-4">🤖</div>
        <h1 className="text-4xl font-bold mb-4 text-wincamp-purple">404</h1>
        <p className="text-xl text-gray-600 mb-6">אופס! העמוד לא נמצא</p>
        
        <Link 
          to={"/dashboard"} 
          className="inline-block btn-primary"
        >
          חזרה לעמוד הראשי
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
