
import React from 'react';
import { Button } from "@/components/ui/button";
import { categories } from "@/utils/categories";

interface CategoryFilterProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  setSelectedCategory 
}) => {
  return (
    <div className="mb-6">
      <div className="mb-4 font-bold">סנן לפי קטגוריה:</div>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
        >
          הכל
        </Button>
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className={`${selectedCategory === category.id ? 'bg-' + category.color + '-600' : 'hover:bg-' + category.color + '-100'}`}
          >
            {category.icon} {category.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
