
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
        className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-none shadow-md"
      >
        <Upload size={16} />
        יבוא מאקסל
      </Button>
      
      <Button 
        variant="outline" 
        onClick={handleExportToExcel}
        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-none shadow-md"
        disabled={!studentsExist}
      >
        <Download size={16} />
        ייצוא לאקסל
      </Button>
    </div>
  );
};

export default StudentActions;
