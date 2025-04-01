
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface AttendanceChartProps {
  attendanceData: { name: string, present: number }[];
}

const AttendanceChart: React.FC<AttendanceChartProps> = ({ attendanceData }) => {
  return (
    <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-lg p-4 border border-slate-200">
      <h3 className="text-xl mb-4 text-gray-800">נוכחות בימים האחרונים</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={attendanceData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', color: '#1f2937' }}
              labelStyle={{ color: '#4b5563' }}
            />
            <Legend />
            <Bar dataKey="present" name="תלמידים נוכחים" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;
