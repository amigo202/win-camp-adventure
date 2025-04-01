
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
  // Use filtered students if provided, otherwise use all students
  const displayStudents = filteredStudents || students;

  if (students.length === 0) {
    return (
      <div className="bg-indigo-700/30 p-8 rounded-lg text-center backdrop-blur-sm">
        <p className="text-white">לא נמצאו תלמידים. הוסיפו תלמידים או יבאו מקובץ אקסל.</p>
      </div>
    );
  }

  if (displayStudents.length === 0) {
    return (
      <div className="bg-indigo-700/30 p-8 rounded-lg text-center backdrop-blur-sm">
        <p className="text-white">לא נמצאו תלמידים התואמים את החיפוש או הסינון.</p>
      </div>
    );
  }

  return (
    <div className="bg-indigo-700/30 p-4 rounded-lg overflow-hidden backdrop-blur-sm border border-indigo-600/50">
      <h3 className="text-xl mb-4 text-white font-bold text-right">תלמידים ({displayStudents.length} מתוך {students.length})</h3>
      <ScrollArea className="h-[450px]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-indigo-800/50 sticky top-0 z-10">
              <TableRow>
                <TableHead className="text-white font-bold">שם</TableHead>
                <TableHead className="text-white font-bold">סיסמה</TableHead>
                <TableHead className="text-white font-bold">כיתה</TableHead>
                <TableHead className="text-white font-bold">טלפון הורה</TableHead>
                <TableHead className="text-white font-bold">הערות</TableHead>
                <TableHead className="text-white font-bold text-left">פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayStudents.map((student) => (
                <TableRow key={student.id} className="border-b border-indigo-600/30 hover:bg-indigo-700/40">
                  <TableCell className="font-medium text-white">{student.name}</TableCell>
                  <TableCell className="text-white">{student.password}</TableCell>
                  <TableCell className="text-white">{student.grade || '-'}</TableCell>
                  <TableCell className="text-white">{student.parentPhone || '-'}</TableCell>
                  <TableCell className="text-white">{student.notes || '-'}</TableCell>
                  <TableCell className="text-left">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDeleteStudent(student.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/30"
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
