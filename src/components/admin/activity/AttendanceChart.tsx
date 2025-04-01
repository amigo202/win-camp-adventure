
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
  );
};

export default AttendanceChart;
