
import React from 'react';
import { Student } from '@/types/student';

interface StatisticsCardsProps {
  students: Student[];
  activeStudents: number;
  totalCompletedTools: number;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({
  students,
  activeStudents,
  totalCompletedTools
}) => {
  return (
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
  );
};

export default StatisticsCards;
