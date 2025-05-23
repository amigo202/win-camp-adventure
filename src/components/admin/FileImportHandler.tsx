
import React, { useRef } from 'react';
import { Student } from '@/types/student';
import { Button } from "@/components/ui/button";
import { Upload, Download } from 'lucide-react';
import { toast } from "sonner";
import { importStudentsFromExcel, exportStudentsToExcel } from '@/utils/excelUtils';

interface FileImportHandlerProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
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
        onClick={handleExportToExcel}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white border-none shadow-sm"
        disabled={students.length === 0}
      >
        <Download size={16} className="ml-2" />
        ייצוא לאקסל
      </Button>
      
      <Button 
        variant="outline" 
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white border-none shadow-sm"
      >
        <Upload size={16} className="ml-2" />
        יבוא מאקסל
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
