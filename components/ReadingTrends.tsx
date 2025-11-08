
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChartBarIcon } from './icons';

interface TrendData {
  day: string;
  '文字数': number;
}

interface ReadingTrendsProps {
  data: TrendData[];
}

const ReadingTrends: React.FC<ReadingTrendsProps> = ({ data }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-on-surface mb-4 flex items-center gap-2">
        <ChartBarIcon className="w-6 h-6" />
        読書トレンド
      </h2>
      <p className="text-sm text-gray-400 mb-4">曜日別の合計読書文字数</p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" tickFormatter={(value) => `${Number(value) / 1000}k`} allowDecimals={false}/>
            <Tooltip
              contentStyle={{ backgroundColor: '#2d2d2d', border: '1px solid #555', color: '#fff' }}
              formatter={(value: number) => `${value.toLocaleString()} 文字`}
              labelStyle={{ color: '#bbb' }}
            />
            <Bar dataKey="文字数" fill="#8884d8" name="読書文字数" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReadingTrends;
