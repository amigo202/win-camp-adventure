
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar as CalendarIcon, Check, X, Save } from 'lucide-react';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { Student } from '@/types/student';
import { getStudentsData, saveStudentsData } from '../../utils/studentUtils';
import { getCurrentUser } from '../../utils/authUtils';

const AttendanceTracker: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const currentUser = getCurrentUser();

  // טעינת נתוני תלמידים
  useEffect(() => {
    const loadedStudents = getStudentsData();
    setStudents(loadedStudents);
    
    // איתחול נוכחות התלמידים ליום הנבחר
    const dateString = format(date, 'yyyy-MM-dd');
    const initialAttendance: Record<string, boolean> = {};
    
    loadedStudents.forEach(student => {
      initialAttendance[student.id] = student.attendanceDays?.includes(dateString) || false;
    });
    
    setAttendance(initialAttendance);
    setUnsavedChanges(false);
  }, [date]);

  // עדכון נוכחות תלמיד
  const toggleAttendance = (studentId: string) => {
    setAttendance(prev => {
      const updated = { ...prev, [studentId]: !prev[studentId] };
      setUnsavedChanges(true);
      return updated;
    });
  };

  // שמירת נוכחות
  const saveAttendance = () => {
    const dateString = format(date, 'yyyy-MM-dd');
    const updatedStudents = students.map(student => {
      const attended = attendance[student.id];
      let attendanceDays = [...(student.attendanceDays || [])];
      
      // הוספה או הסרה מרשימת הנוכחות
      if (attended && !attendanceDays.includes(dateString)) {
        attendanceDays.push(dateString);
      } else if (!attended && attendanceDays.includes(dateString)) {
        attendanceDays = attendanceDays.filter(day => day !== dateString);
      }
      
      return { ...student, attendanceDays };
    });
    
    saveStudentsData(updatedStudents);
    setStudents(updatedStudents);
    setUnsavedChanges(false);
    toast.success("הנוכחות נשמרה בהצלחה");
  };

  // סימון כל התלמידים כנוכחים
  const markAllPresent = () => {
    const updatedAttendance: Record<string, boolean> = {};
    students.forEach(student => {
      updatedAttendance[student.id] = true;
    });
    setAttendance(updatedAttendance);
    setUnsavedChanges(true);
  };

  // סימון כל התלמידים כנעדרים
  const markAllAbsent = () => {
    const updatedAttendance: Record<string, boolean> = {};
    students.forEach(student => {
      updatedAttendance[student.id] = false;
    });
    setAttendance(updatedAttendance);
    setUnsavedChanges(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">רישום נוכחות</h2>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white border-none"
              >
                <CalendarIcon className="h-4 w-4" />
                {format(date, 'dd/MM/yyyy', { locale: he })}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                disabled={(date) => date > new Date() || date < new Date('2023-01-01')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {students.length > 0 ? (
        <>
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="space-x-2 flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={markAllPresent}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white border-none"
                >
                  <Check size={16} />
                  סמן הכל כנוכחים
                </Button>
                <Button 
                  variant="outline" 
                  onClick={markAllAbsent}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white border-none"
                >
                  <X size={16} />
                  סמן הכל כנעדרים
                </Button>
              </div>
              
              <Button 
                onClick={saveAttendance}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
                disabled={!unsavedChanges}
              >
                <Save size={16} />
                שמור נוכחות
              </Button>
            </div>
            
            <div className="overflow-x-auto">
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
          </div>
          
          {unsavedChanges && (
            <div className="fixed bottom-4 left-4 right-4 bg-yellow-500 text-black p-4 rounded-md shadow-lg max-w-xl mx-auto flex justify-between items-center">
              <p>יש לך שינויים שלא נשמרו!</p>
              <Button 
                onClick={saveAttendance}
                variant="secondary"
                className="bg-black text-white hover:bg-gray-800"
              >
                שמור עכשיו
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white/5 p-8 rounded-lg text-center">
          <p className="text-gray-300">לא נמצאו תלמידים. הוסיפו תלמידים במסך ניהול התלמידים.</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceTracker;
