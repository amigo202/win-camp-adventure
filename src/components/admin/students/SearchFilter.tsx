
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterGrade: string;
  setFilterGrade: (value: string) => void;
  availableGrades: string[];
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
  filterGrade,
  setFilterGrade,
  availableGrades
}) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-4 justify-end">
      <div className="flex items-center gap-2">
        <Select value={filterGrade} onValueChange={setFilterGrade}>
          <SelectTrigger className="w-36 bg-indigo-700/30 text-white border-indigo-600/50">
            <SelectValue placeholder="סנן לפי כיתה" />
          </SelectTrigger>
          <SelectContent className="bg-indigo-800 text-white border-indigo-600">
            <SelectItem value="all">כל הכיתות</SelectItem>
            {availableGrades.map((grade) => (
              <SelectItem key={grade} value={grade}>
                {grade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Filter size={18} className="text-indigo-300 mr-2" />
      </div>
      <div className="relative flex-grow">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-300" size={18} />
        <Input
          className="bg-indigo-700/30 text-white border-indigo-600/50 pr-10 placeholder:text-indigo-300/70 text-right"
          placeholder="חיפוש לפי שם או הערות..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
