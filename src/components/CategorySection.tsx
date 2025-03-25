
import React from 'react';
import { Category, Tool } from '../utils/data';
import ToolCard from './ToolCard';

interface CategorySectionProps {
  category: Category;
  tools: Tool[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, tools }) => {
  const getBgColor = () => {
    switch (category.color) {
      case 'blue': return 'from-wincamp-blue/20 to-transparent';
      case 'purple': return 'from-wincamp-purple/20 to-transparent';
      case 'green': return 'from-wincamp-green/20 to-transparent';
      case 'pink': return 'from-wincamp-pink/20 to-transparent';
      case 'orange': return 'from-wincamp-orange/20 to-transparent';
      default: return 'from-wincamp-blue/20 to-transparent';
    }
  };
  
  return (
    <section className="mb-10 animate-slide-in-bottom" style={{ animationDelay: '0.1s' }}>
      <div className={`rounded-xl p-6 bg-gradient-to-r ${getBgColor()}`}>
        <h2 className="section-title">
          <span className="section-icon">{category.icon}</span>
          {category.title}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
