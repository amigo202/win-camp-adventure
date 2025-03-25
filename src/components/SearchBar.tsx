
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { getAllTools, Tool } from '../utils/data';

interface SearchBarProps {
  onSelectTool: (tool: Tool) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelectTool }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Tool[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 1) {
      const allTools = getAllTools();
      const results = allTools.filter(tool => 
        tool.title.includes(term) || 
        tool.description.includes(term)
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };
  
  const handleSelectTool = (tool: Tool) => {
    onSelectTool(tool);
    setSearchTerm('');
    setShowResults(false);
  };
  
  return (
    <div className="relative w-full max-w-md mx-auto mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="חפש כלים ופעילויות..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wincamp-purple/50"
          dir="rtl"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={20} />
        </div>
      </div>
      
      {showResults && searchResults.length > 0 && (
        <div className="absolute w-full mt-2 glass-card rounded-xl z-10 shadow-xl max-h-60 overflow-y-auto">
          {searchResults.map(tool => (
            <div 
              key={tool.id}
              className="p-3 hover:bg-wincamp-purple/10 cursor-pointer flex items-center"
              onClick={() => handleSelectTool(tool)}
              dir="rtl"
            >
              <span className="mr-2">{tool.icon}</span>
              <div>
                <div className="font-medium">{tool.title}</div>
                <div className="text-xs text-gray-500">{tool.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
