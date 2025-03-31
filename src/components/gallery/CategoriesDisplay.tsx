
import React from 'react';
import { categories, getToolsByCategory, Tool } from '../../utils/data';
import CategorySection from '../CategorySection';

interface CategoriesDisplayProps {
  onSelectTool: (tool: Tool) => void;
}

const CategoriesDisplay: React.FC<CategoriesDisplayProps> = ({ onSelectTool }) => {
  return (
    <>
      {categories.map((category) => (
        <div id={`category-${category.id}`} key={category.id}>
          <CategorySection 
            category={category} 
            tools={getToolsByCategory(category.id)} 
          />
        </div>
      ))}
    </>
  );
};

export default CategoriesDisplay;
