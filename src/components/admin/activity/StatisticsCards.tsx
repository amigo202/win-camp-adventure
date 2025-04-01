
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
      <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-lg p-6 border border-blue-100">
        <h3 className="text-lg text-blue-700 mb-2">תלמידים פעילים היום</h3>
        <p className="text-4xl font-bold text-gray-800">{activeStudents} <span className="text-lg text-blue-500">/ {students.length}</span></p>
      </div>
      
      <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-lg p-6 border border-purple-100">
        <h3 className="text-lg text-purple-700 mb-2">כלים שהושלמו (סה"כ)</h3>
        <p className="text-4xl font-bold text-gray-800">{totalCompletedTools}</p>
      </div>
      
      <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-lg p-6 border border-green-100">
        <h3 className="text-lg text-green-700 mb-2">ממוצע כלים לתלמיד</h3>
        <p className="text-4xl font-bold text-gray-800">
          {students.length ? (totalCompletedTools / students.length).toFixed(1) : '0'}
        </p>
      </div>
    </div>
  );
};

export default StatisticsCards;
