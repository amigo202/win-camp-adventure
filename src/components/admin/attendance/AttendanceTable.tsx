
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X } from 'lucide-react';
import { Student } from '@/types/student';

interface AttendanceTableProps {
  students: Student[];
  attendance: Record<string, boolean>;
  toggleAttendance: (studentId: string) => void;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ 
  students, 
  attendance, 
  toggleAttendance 
}) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md bg-white/95" dir="rtl">
      <Table>
        <TableHeader className="bg-indigo-100">
          <TableRow>
            <TableHead className="text-indigo-900 font-bold">שם</TableHead>
            <TableHead className="text-indigo-900 font-bold">כיתה</TableHead>
            <TableHead className="text-indigo-900 font-bold text-center">נוכחות</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id} className="hover:bg-indigo-50/50">
              <TableCell className="font-medium text-gray-900">{student.name}</TableCell>
              <TableCell className="text-gray-700">{student.grade || '-'}</TableCell>
              <TableCell className="text-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleAttendance(student.id)}
                  className={`w-28 border ${
                    attendance[student.id] 
                      ? 'bg-green-500/70 hover:bg-green-600/80 text-white' 
                      : 'bg-red-500/70 hover:bg-red-600/80 text-white'
                  }`}
                >
                  {attendance[student.id] ? (
                    <span className="flex items-center gap-2">
                      <Check size={16} className="text-white" />
                      נוכח/ת
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <X size={16} className="text-white" />
                      נעדר/ת
                    </span>
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceTable;
