
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
        className={`relative bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer tooltip-container
          ${completed ? 'completed border-2 border-wincamp-green' : ''} 
          ${animateIn ? 'animate-bounce-in' : 'opacity-0'}`}
        onClick={handleStartClick}
        dir="rtl"
      >
        <div className="completed-badge">
          <Check size={16} />
        </div>
        
        <div className="p-6">
          <div className="text-4xl mb-3">{tool.icon}</div>
          <h3 className="font-bold text-xl mb-2 text-blue-900">{tool.title}</h3>
          
          <div className="flex justify-between mt-6">
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-md transition-all hover:scale-105 text-lg"
              onClick={handleStartClick}
            >
              התחל
            </button>
            
            <button 
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110
                ${completed 
                  ? 'bg-wincamp-green text-white' 
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
              onClick={handleToggleCompleted}
            >
              <Check size={18} />
            </button>
          </div>
        </div>
        
        <div className="tooltip bg-blue-900 text-white">
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
