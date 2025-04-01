
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
    <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-lg p-4 border border-slate-200" dir="rtl">
      <h3 className="text-xl mb-4 font-bold text-gray-800">פעילות תלמידים</h3>
      <ScrollArea className="h-[450px]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-indigo-200/80 sticky top-0 z-10">
              <TableRow>
                <TableHead className="text-gray-800 font-bold">שם</TableHead>
                <TableHead className="text-gray-800 font-bold">כיתה</TableHead>
                <TableHead className="text-gray-800 font-bold text-center">כלים שהושלמו</TableHead>
                <TableHead className="text-gray-800 font-bold">פעילות אחרונה</TableHead>
                <TableHead className="text-gray-800 font-bold text-center">ימי נוכחות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="border-b border-slate-200 hover:bg-slate-100/60">
                  <TableCell className="font-medium text-gray-800">{student.name}</TableCell>
                  <TableCell className="text-gray-800">{student.grade || '-'}</TableCell>
                  <TableCell className="text-gray-800 text-center">{student.completedTools?.length || 0}</TableCell>
                  <TableCell className="text-gray-800">{student.lastActive ? formatDate(student.lastActive) : 'לא פעיל עדיין'}</TableCell>
                  <TableCell className="text-gray-800 text-center">{student.attendanceDays?.length || 0}</TableCell>
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
