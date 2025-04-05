
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, CheckSquare } from 'lucide-react';
import { Student } from '@/types/student';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from "sonner";

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
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

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
    if (window.confirm("האם אתה בטוח שברצונך למחוק את התלמיד?")) {
      handleDeleteStudent(id);
      toast.success("התלמיד נמחק בהצלחה");
    }
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const handleBulkDelete = () => {
    if (selectedStudents.length === 0) {
      toast.error("לא נבחרו תלמידים למחיקה");
      return;
    }

    console.log("Initial selectedStudents:", selectedStudents);
    const countToDelete = selectedStudents.length;
    
    if (window.confirm(`האם אתה בטוח שברצונך למחוק ${countToDelete} תלמידים?`)) {
      console.log(`Confirmed deleting ${countToDelete} students`);
      
      // עותק של מערך התלמידים שנבחרו למחיקה - חשוב מאוד!
      const studentsToDelete = [...selectedStudents];
      console.log("Copy of students to delete:", studentsToDelete);
      
      // ניקוי הבחירה לפני המחיקה למניעת בעיות
      setSelectedStudents([]);
      
      // FIX: Pass the entire array of students to delete at once to the hook
      // This way we'll update state only once and avoid rendering issues
      handleMultipleStudentsDelete(studentsToDelete);
      
      // הצגת הודעת הצלחה עם המספר המקורי
      toast.success(`${countToDelete} תלמידים נמחקו בהצלחה`);
    }
  };

  // Helper method to pass to parent for bulk deletion
  const handleMultipleStudentsDelete = (studentIds: string[]) => {
    studentIds.forEach(id => {
      console.log(`Requesting deletion for student ID: ${id}`);
    });
    
    // Call the parent component's handler with the array of IDs
    handleDeleteStudent(studentIds.join(','));
  };

  const selectAll = () => {
    if (selectedStudents.length === displayStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(displayStudents.map(student => student.id));
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-lg p-4 overflow-hidden border border-slate-200" dir="rtl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl text-gray-900 font-bold">תלמידים ({displayStudents.length} מתוך {students.length})</h3>
        {selectedStudents.length > 0 && (
          <Button 
            variant="destructive"
            className="flex items-center gap-2"
            onClick={handleBulkDelete}
          >
            <Trash2 size={16} />
            מחק {selectedStudents.length} תלמידים
          </Button>
        )}
      </div>

      <ScrollArea className="h-[450px]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-indigo-200/80 sticky top-0 z-10">
              <TableRow>
                <TableHead className="w-12 text-center">
                  <Checkbox 
                    checked={displayStudents.length > 0 && selectedStudents.length === displayStudents.length}
                    onCheckedChange={selectAll}
                    aria-label="בחר הכל"
                  />
                </TableHead>
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
                  <TableCell className="text-center">
                    <Checkbox 
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={() => toggleStudentSelection(student.id)}
                      aria-label={`בחר תלמיד ${student.name}`}
                    />
                  </TableCell>
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
