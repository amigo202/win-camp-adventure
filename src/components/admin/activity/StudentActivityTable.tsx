
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Student } from '@/types/student';
import { ScrollArea } from '@/components/ui/scroll-area';

interface StudentActivityTableProps {
  students: Student[];
  formatDate: (dateString?: string) => string;
}

const StudentActivityTable: React.FC<StudentActivityTableProps> = ({ students, formatDate }) => {
  return (
    <div className="bg-indigo-700/30 p-4 rounded-lg overflow-hidden border border-indigo-600/50 backdrop-blur-sm" dir="rtl">
      <h3 className="text-xl mb-4 font-bold text-white">פעילות תלמידים</h3>
      <ScrollArea className="h-[450px]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-indigo-800/50 sticky top-0 z-10">
              <TableRow>
                <TableHead className="text-white font-bold">שם</TableHead>
                <TableHead className="text-white font-bold">כיתה</TableHead>
                <TableHead className="text-white font-bold text-center">כלים שהושלמו</TableHead>
                <TableHead className="text-white font-bold">פעילות אחרונה</TableHead>
                <TableHead className="text-white font-bold text-center">ימי נוכחות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="border-b border-indigo-600/30 hover:bg-indigo-700/40">
                  <TableCell className="font-medium text-white">{student.name}</TableCell>
                  <TableCell className="text-white">{student.grade || '-'}</TableCell>
                  <TableCell className="text-white text-center">{student.completedTools?.length || 0}</TableCell>
                  <TableCell className="text-white">{student.lastActive ? formatDate(student.lastActive) : 'לא פעיל עדיין'}</TableCell>
                  <TableCell className="text-white text-center">{student.attendanceDays?.length || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default StudentActivityTable;
