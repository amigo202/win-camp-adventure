
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
      <div className="bg-white/5 p-8 rounded-lg text-center">
        <p className="text-gray-300">לא נמצאו תלמידים. הוסיפו תלמידים או יבאו מקובץ אקסל.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 p-4 rounded-lg overflow-hidden">
      <h3 className="text-xl mb-4">תלמידים ({students.length})</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">שם</TableHead>
              <TableHead className="text-white">סיסמה</TableHead>
              <TableHead className="text-white">כיתה</TableHead>
              <TableHead className="text-white">הערות</TableHead>
              <TableHead className="text-white text-right">פעולות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium text-white">{student.name}</TableCell>
                <TableCell className="text-white">{student.password}</TableCell>
                <TableCell className="text-white">{student.grade || '-'}</TableCell>
                <TableCell className="text-white">{student.notes || '-'}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteStudent(student.id)}
                    className="text-red-400 hover:text-red-500 hover:bg-red-500/20"
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
