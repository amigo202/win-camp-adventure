
import React from 'react';
import { useActivityMonitor } from '../../hooks/useActivityMonitor';
import StatisticsCards from './activity/StatisticsCards';
import AttendanceChart from './activity/AttendanceChart';
import ToolsProgressChart from './activity/ToolsProgressChart';
import StudentActivityTable from './activity/StudentActivityTable';

const ActivityMonitor: React.FC = () => {
  const {
    students,
    activeStudents,
    totalCompletedTools,
    attendanceData,
    toolsProgressData,
    formatDate
  } = useActivityMonitor();

  return (
    <div className="space-y-6" dir="rtl">
      <h2 className="text-2xl font-bold text-gray-800">מעקב פעילות</h2>
      
      {/* כרטיסי סטטיסטיקות */}
      <StatisticsCards 
        students={students} 
        activeStudents={activeStudents} 
        totalCompletedTools={totalCompletedTools} 
      />
      
      {/* גרפים */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* גרף נוכחות */}
        <AttendanceChart attendanceData={attendanceData} />
        
        {/* גרף התקדמות בכלים */}
        <ToolsProgressChart toolsProgressData={toolsProgressData} />
      </div>
      
      {/* טבלת תלמידים */}
      <StudentActivityTable students={students} formatDate={formatDate} />
    </div>
  );
};

export default ActivityMonitor;
