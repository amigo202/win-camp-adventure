
import React, { useState, useEffect } from 'react';
import { Tool } from '../utils/data';
import { isToolCompleted, markToolAsComplete } from '../utils/authUtils';
import { Check } from 'lucide-react';
import PythonLessonsSection from './PythonLessonsSection';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const [completed, setCompleted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [showPythonLessons, setShowPythonLessons] = useState(false);
  
  useEffect(() => {
    // Check if the tool is already completed
    setCompleted(isToolCompleted(tool.id));
    
    // Trigger entrance animation with a slight delay based on position
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, Math.random() * 300);
    
    return () => clearTimeout(timer);
  }, [tool.id]);
  
  const handleStartClick = () => {
    if (tool.id === "python") {
      setShowPythonLessons(true);
    } else {
      window.open(tool.link, "_blank");
    }
  };
  
  const handleToggleCompleted = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !completed;
    setCompleted(newState);
    markToolAsComplete(tool.id, newState);
  };
  
  return (
    <div id={`tool-${tool.id}`}>
      <div 
        className={`relative glass-card rounded-xl overflow-hidden card-hover cursor-pointer tooltip-container
          ${completed ? 'completed' : ''} 
          ${animateIn ? 'animate-bounce-in' : 'opacity-0'}`}
        onClick={handleStartClick}
        dir="rtl"
      >
        <div className="completed-badge">
          <Check size={16} />
        </div>
        
        <div className="p-4">
          <div className="text-3xl mb-2">{tool.icon}</div>
          <h3 className="font-bold text-lg mb-1">{tool.title}</h3>
          
          <div className="flex justify-between mt-4">
            <button 
              className="bg-wincamp-blue text-white px-3 py-1 rounded-lg text-sm hover:bg-wincamp-purple transition-colors"
              onClick={handleStartClick}
            >
              התחל
            </button>
            
            <button 
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                ${completed 
                  ? 'bg-wincamp-green text-white' 
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
              onClick={handleToggleCompleted}
            >
              <Check size={16} />
            </button>
          </div>
        </div>
        
        <div className="tooltip">
          {tool.description}
        </div>
      </div>
      
      {showPythonLessons && tool.id === "python" && (
        <div className="mt-4">
          <PythonLessonsSection />
        </div>
      )}
    </div>
  );
};

export default ToolCard;
