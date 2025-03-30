
import React, { RefObject } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Download } from 'lucide-react';

interface StudentActionsProps {
  fileInputRef: RefObject<HTMLInputElement>;
  handleExportToExcel: () => void;
  studentsExist: boolean;
}

const StudentActions: React.FC<StudentActionsProps> = ({ 
  fileInputRef, 
  handleExportToExcel,
  studentsExist
}) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white border-none"
      >
        <Upload size={16} />
        יבוא מאקסל
      </Button>
      
      <Button 
        variant="outline" 
        onClick={handleExportToExcel}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white border-none"
        disabled={!studentsExist}
      >
        <Download size={16} />
        ייצוא לאקסל
      </Button>
    </div>
  );
};

export default StudentActions;
