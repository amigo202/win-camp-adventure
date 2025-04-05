
import React, { useRef } from 'react';
import { Student } from '@/types/student';
import { Button } from "@/components/ui/button";
import { Upload, Download } from 'lucide-react';
import { toast } from "sonner";
import { importStudentsFromExcel, exportStudentsToExcel } from '@/utils/excelUtils';

interface FileImportHandlerProps {
  students: Student[];
  onStudentsImported: (newStudents: Student[]) => void;
}

const FileImportHandler: React.FC<FileImportHandlerProps> = ({ students, onStudentsImported }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedStudents = await importStudentsFromExcel(file);
      onStudentsImported(importedStudents);
      toast.success(`יובאו ${importedStudents.length} תלמידים בהצלחה`);
    } catch (error) {
      console.error("Failed to import students:", error);
      toast.error("שגיאה ביבוא תלמידים");
    }
    
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleExportToExcel = () => {
    if (students.length === 0) {
      toast.error("אין תלמידים לייצוא");
      return;
    }
    exportStudentsToExcel(students);
  };

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
        disabled={students.length === 0}
      >
        <Download size={16} />
        ייצוא לאקסל
      </Button>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".xlsx,.xls"
        className="hidden"
      />
    </div>
  );
};

export default FileImportHandler;
