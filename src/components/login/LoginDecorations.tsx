
import React from 'react';

const LoginDecorations: React.FC = () => {
  return (
    <div className="relative">
      {/* Robot image */}
      <img 
        src="/lovable-uploads/b999c532-4bb1-4c27-8bde-3e5fed1926d5.png" 
        alt="Robot mascot" 
        className="h-40 object-contain absolute bottom-0 right-0 translate-x-20"
      />
      {/* Rocket image */}
      <div className="absolute bottom-20 left-0 -translate-x-20">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 16.5L3 20L6.5 18.5" stroke="#FF5733" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.5 16.5L21 20L17.5 18.5" stroke="#FF5733" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 15L12 21" stroke="#FF5733" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.5 12H19.5L17 3L12 7L7 3L4.5 12Z" fill="#FF7043" stroke="#FF5733" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

export default LoginDecorations;
