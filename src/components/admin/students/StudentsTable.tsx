
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import { Student } from '@/types/student';
import { ScrollArea } from '@/components/ui/scroll-area';

interface StudentsTableProps {
  students: Student[];
  handleDeleteStudent: (id: string) => void;
  filteredStudents?: Student[];
}

const StudentsTable: React.FC<StudentsTableProps> = ({ 
  students, 
  handleDeleteStudent,
  filteredStudents 
}) => {
  const displayStudents = filteredStudents || students;

  if (students.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-lg p-8 text-center">
        <p className="text-gray-900">לא נמצאו תלמידים. הוסיפו תלמידים או יבאו מקובץ אקסל.</p>
      </div>
    );
  }

  if (displayStudents.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-lg p-8 text-center">
        <p className="text-gray-900">לא נמצאו תלמידים התואמים את החיפוש או הסינון.</p>
      </div>
    );
  }

  const onDeleteClick = (id: string) => {
    console.log("Deleting student with ID:", id);
    handleDeleteStudent(id);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-lg p-4 overflow-hidden border border-slate-200" dir="rtl">
      <h3 className="text-xl mb-4 text-gray-900 font-bold">תלמידים ({displayStudents.length} מתוך {students.length})</h3>
      <ScrollArea className="h-[450px]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-indigo-200/80 sticky top-0 z-10">
              <TableRow>
                <TableHead className="text-gray-900 font-bold">שם</TableHead>
                <TableHead className="text-gray-900 font-bold">סיסמה</TableHead>
                <TableHead className="text-gray-900 font-bold">כיתה</TableHead>
                <TableHead className="text-gray-900 font-bold">טלפון הורה</TableHead>
                <TableHead className="text-gray-900 font-bold">הערות</TableHead>
                <TableHead className="text-gray-900 font-bold">פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayStudents.map((student) => (
                <TableRow key={student.id} className="border-b border-slate-200 hover:bg-slate-100/60">
                  <TableCell className="font-medium text-gray-900">{student.name}</TableCell>
                  <TableCell className="text-gray-900">{student.password}</TableCell>
                  <TableCell className="text-gray-900">{student.grade || '-'}</TableCell>
                  <TableCell className="text-gray-900">{student.parentPhone || '-'}</TableCell>
                  <TableCell className="text-gray-900">{student.notes || '-'}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onDeleteClick(student.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default StudentsTable;
