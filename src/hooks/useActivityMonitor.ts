
import { useState, useEffect } from 'react';
import { getStudentsData } from '../utils/studentUtils';
import { Student } from '@/types/student';

export const useActivityMonitor = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [activeStudents, setActiveStudents] = useState<number>(0);
  const [totalCompletedTools, setTotalCompletedTools] = useState<number>(0);
  const [attendanceData, setAttendanceData] = useState<{ name: string, present: number }[]>([]);
  const [toolsProgressData, setToolsProgressData] = useState<{ name: string, count: number }[]>([]);

  // המרת תאריך לפורמט מתאים
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    if (dateString.includes('T')) {
      // יש שעה בתאריך
      const date = new Date(dateString);
      return `${date.toLocaleDateString('he-IL')} ${date.toLocaleTimeString('he-IL')}`;
    }
    return new Date(dateString).toLocaleDateString('he-IL');
  };

  useEffect(() => {
    const loadedStudents = getStudentsData();
    setStudents(loadedStudents);

    // חישוב סטטיסטיקות
    const today = new Date().toISOString().split('T')[0];
    const active = loadedStudents.filter(s => 
      s.lastActive && s.lastActive.startsWith(today)
    ).length;
    
    setActiveStudents(active);
    
    // יצירת נתוני נוכחות לגרף
    const days = new Map<string, number>();
    loadedStudents.forEach(student => {
      if (student.attendanceDays) {
        student.attendanceDays.forEach(day => {
          days.set(day, (days.get(day) || 0) + 1);
        });
      }
    });
    
    // המרה למערך מסודר לפי תאריכים
    const sortedDays = [...days.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-7) // 7 ימים אחרונים
      .map(([date, count]) => ({
        name: date.substring(5), // רק MM-DD
        present: count
      }));
    
    setAttendanceData(sortedDays);
    
    // סטטיסטיקות על כלים שהושלמו
    const completed = loadedStudents.reduce((total, student) => 
      total + (student.completedTools?.length || 0), 0);
    setTotalCompletedTools(completed);
    
    // נתונים לגרף עוגה - מספר תלמידים לפי כמות כלים שהשלימו
    const toolsProgress = new Map<number, number>();
    loadedStudents.forEach(student => {
      const count = student.completedTools?.length || 0;
      toolsProgress.set(count, (toolsProgress.get(count) || 0) + 1);
    });
    
    const toolsData = [...toolsProgress.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([count, students]) => ({
        name: count === 0 ? 'לא השלימו כלים' : `השלימו ${count} כלים`,
        count: students
      }));
    
    setToolsProgressData(toolsData);
  }, []);

  return {
    students,
    activeStudents,
    totalCompletedTools,
    attendanceData,
    toolsProgressData,
    formatDate
  };
};
