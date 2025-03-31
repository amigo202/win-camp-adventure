
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import { Student } from '@/types/student';

interface StudentsTableProps {
  students: Student[];
  handleDeleteStudent: (id: string) => void;
}

const StudentsTable: React.FC<StudentsTableProps> = ({ students, handleDeleteStudent }) => {
  if (students.length === 0) {
    return (
      <div className="bg-indigo-700/30 p-8 rounded-lg text-center backdrop-blur-sm">
        <p className="text-white">לא נמצאו תלמידים. הוסיפו תלמידים או יבאו מקובץ אקסל.</p>
      </div>
    );
  }

  return (
    <div className="bg-indigo-700/30 p-4 rounded-lg overflow-hidden backdrop-blur-sm border border-indigo-600/50">
      <h3 className="text-xl mb-4 text-white font-bold">תלמידים ({students.length})</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-indigo-800/50">
            <TableRow>
              <TableHead className="text-white font-bold">שם</TableHead>
              <TableHead className="text-white font-bold">סיסמה</TableHead>
              <TableHead className="text-white font-bold">כיתה</TableHead>
              <TableHead className="text-white font-bold">טלפון הורה</TableHead>
              <TableHead className="text-white font-bold">הערות</TableHead>
              <TableHead className="text-white font-bold text-right">פעולות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id} className="border-b border-indigo-600/30 hover:bg-indigo-700/40">
                <TableCell className="font-medium text-white">{student.name}</TableCell>
                <TableCell className="text-white">{student.password}</TableCell>
                <TableCell className="text-white">{student.grade || '-'}</TableCell>
                <TableCell className="text-white">{student.parentPhone || '-'}</TableCell>
                <TableCell className="text-white">{student.notes || '-'}</TableCell>
                <TableCell className="text-right">
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
    </div>
  );
};

export default StudentsTable;
