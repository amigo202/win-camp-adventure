
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
  // Function to get appropriate button colors based on category
  const getButtonClasses = (categoryId: string | null) => {
    if (categoryId === null) {
      return selectedCategory === null 
        ? "bg-indigo-600 text-white hover:bg-indigo-700" 
        : "bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50";
    }

    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return "";

    // Return either active or inactive styling based on selection state
    return selectedCategory === categoryId
      ? `bg-${category.color}-600 text-white hover:bg-${category.color}-700`
      : `bg-white text-${category.color}-700 border-${category.color}-200 hover:bg-${category.color}-50`;
  };

  return (
    <div className="mb-6 bg-white/90 p-4 rounded-lg shadow-sm">
      <div className="mb-4 font-bold text-indigo-900">סנן לפי קטגוריה:</div>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          className={getButtonClasses(null)}
        >
          הכל
        </Button>
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className={getButtonClasses(category.id)}
          >
            {category.icon} {category.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
