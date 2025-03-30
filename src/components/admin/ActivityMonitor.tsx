
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getStudentsData } from '../../utils/studentUtils';
import { getCompletedToolsCount } from '../../utils/authUtils';
import { Student } from '@/types/student';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

const ActivityMonitor: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [activeStudents, setActiveStudents] = useState<number>(0);
  const [totalCompletedTools, setTotalCompletedTools] = useState<number>(0);
  const [attendanceData, setAttendanceData] = useState<{ name: string, present: number }[]>([]);
  const [toolsProgressData, setToolsProgressData] = useState<{ name: string, count: number }[]>([]);

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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">מעקב פעילות</h2>
      
      {/* כרטיסי סטטיסטיקות */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-900/50 p-6 rounded-lg">
          <h3 className="text-lg text-blue-200 mb-2">תלמידים פעילים היום</h3>
          <p className="text-4xl font-bold">{activeStudents} <span className="text-lg text-blue-300">/ {students.length}</span></p>
        </div>
        
        <div className="bg-purple-900/50 p-6 rounded-lg">
          <h3 className="text-lg text-purple-200 mb-2">כלים שהושלמו (סה"כ)</h3>
          <p className="text-4xl font-bold">{totalCompletedTools}</p>
        </div>
        
        <div className="bg-green-900/50 p-6 rounded-lg">
          <h3 className="text-lg text-green-200 mb-2">ממוצע כלים לתלמיד</h3>
          <p className="text-4xl font-bold">
            {students.length ? (totalCompletedTools / students.length).toFixed(1) : '0'}
          </p>
        </div>
      </div>
      
      {/* גרפים */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* גרף נוכחות */}
        <div className="bg-white/5 p-4 rounded-lg">
          <h3 className="text-xl mb-4">נוכחות בימים האחרונים</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={attendanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#333', borderColor: '#666', color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="present" name="תלמידים נוכחים" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* גרף התקדמות בכלים */}
        <div className="bg-white/5 p-4 rounded-lg">
          <h3 className="text-xl mb-4">התפלגות השלמת כלים</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={toolsProgressData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {toolsProgressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} תלמידים`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* טבלת תלמידים */}
      <div className="bg-white/5 p-4 rounded-lg overflow-hidden">
        <h3 className="text-xl mb-4">פעילות תלמידים</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">שם</TableHead>
                <TableHead className="text-white">כיתה</TableHead>
                <TableHead className="text-white text-center">כלים שהושלמו</TableHead>
                <TableHead className="text-white">פעילות אחרונה</TableHead>
                <TableHead className="text-white text-center">ימי נוכחות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
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
      </div>
    </div>
  );
};

export default ActivityMonitor;
