
import React, { useEffect } from 'react';

const StarsBackground: React.FC = () => {
  useEffect(() => {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    // Remove any existing stars
    starsContainer.innerHTML = '';
    
    // Create stars
    const starCount = 100;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      
      // Random position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Random size
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Random animation delay
      star.style.animationDelay = `${Math.random() * 4}s`;
      
      starsContainer.appendChild(star);
    }
  }, []);
  
  return <div className="stars"></div>;
};

export default StarsBackground;
