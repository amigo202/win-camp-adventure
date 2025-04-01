
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { toast } from "sonner";
import { Student } from '@/types/student';
import { getStudentsData, saveStudentsData } from '../../utils/studentUtils';
import { getCurrentUser } from '../../utils/authUtils';
import DateSelector from './attendance/DateSelector';
import AttendanceTable from './attendance/AttendanceTable';
import AttendanceActions from './attendance/AttendanceActions';
import UnsavedChangesAlert from './attendance/UnsavedChangesAlert';
import EmptyStudentsMessage from './attendance/EmptyStudentsMessage';

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
    <div className="space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">רישום נוכחות</h2>
        <div className="flex gap-2">
          <DateSelector date={date} setDate={setDate} />
        </div>
      </div>

      {students.length > 0 ? (
        <>
          <div className="bg-white/5 p-4 rounded-lg">
            <AttendanceActions
              saveAttendance={saveAttendance}
              markAllPresent={markAllPresent}
              markAllAbsent={markAllAbsent}
              unsavedChanges={unsavedChanges}
            />
            
            <AttendanceTable
              students={students}
              attendance={attendance}
              toggleAttendance={toggleAttendance}
            />
          </div>
          
          <UnsavedChangesAlert 
            saveAttendance={saveAttendance} 
            show={unsavedChanges} 
          />
        </>
      ) : (
        <EmptyStudentsMessage />
      )}
    </div>
  );
};

export default AttendanceTracker;
