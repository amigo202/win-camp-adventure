
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

interface ToolsProgressChartProps {
  toolsProgressData: { name: string, count: number }[];
}

const ToolsProgressChart: React.FC<ToolsProgressChartProps> = ({ toolsProgressData }) => {
  return (
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
  );
};

export default ToolsProgressChart;
