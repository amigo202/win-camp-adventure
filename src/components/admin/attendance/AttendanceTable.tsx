
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
    <div className="overflow-x-auto" dir="rtl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">שם</TableHead>
            <TableHead className="text-white">כיתה</TableHead>
            <TableHead className="text-white text-center">נוכחות</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium text-white">{student.name}</TableCell>
              <TableCell className="text-white">{student.grade || '-'}</TableCell>
              <TableCell className="text-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleAttendance(student.id)}
                  className={`w-28 ${
                    attendance[student.id] 
                      ? 'bg-green-500/30 hover:bg-green-500/40 text-white' 
                      : 'bg-red-500/30 hover:bg-red-500/40 text-white'
                  }`}
                >
                  {attendance[student.id] ? (
                    <span className="flex items-center gap-2">
                      <Check size={16} />
                      נוכח/ת
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <X size={16} />
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
