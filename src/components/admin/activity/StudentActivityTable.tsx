
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Student } from '@/types/student';

interface StudentActivityTableProps {
  students: Student[];
  formatDate: (dateString?: string) => string;
}

const StudentActivityTable: React.FC<StudentActivityTableProps> = ({ students, formatDate }) => {
  return (
    <div className="bg-white/5 p-4 rounded-lg overflow-hidden">
      <h3 className="text-xl mb-4">פעילות תלמידים</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white text-right">שם</TableHead>
              <TableHead className="text-white text-right">כיתה</TableHead>
              <TableHead className="text-white text-center">כלים שהושלמו</TableHead>
              <TableHead className="text-white text-right">פעילות אחרונה</TableHead>
              <TableHead className="text-white text-center">ימי נוכחות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium text-white text-right">{student.name}</TableCell>
                <TableCell className="text-white text-right">{student.grade || '-'}</TableCell>
                <TableCell className="text-white text-center">{student.completedTools?.length || 0}</TableCell>
                <TableCell className="text-white text-right">{student.lastActive ? formatDate(student.lastActive) : 'לא פעיל עדיין'}</TableCell>
                <TableCell className="text-white text-center">{student.attendanceDays?.length || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StudentActivityTable;
