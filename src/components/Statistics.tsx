import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { SmokingLog, Statistics as StatsType } from '../types/types';
import { TrendingDown, DollarSign, Calendar, Target } from 'lucide-react';

interface StatisticsProps {
  logs: SmokingLog[];
  statistics: StatsType;
  currency: string;
}

export const Statistics: React.FC<StatisticsProps> = ({ logs, statistics, currency }) => {
  const chartData = logs.map(log => ({
    date: format(new Date(log.date), 'MMM dd'),
    count: log.count,
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Calendar className="w-6 h-6 text-blue-500" />}
          title="Streak Days"
          value={statistics.streakDays}
          suffix="days"
        />
        <StatCard
          icon={<TrendingDown className="w-6 h-6 text-green-500" />}
          title="Average Daily"
          value={statistics.averagePerDay.toFixed(1)}
          suffix="cigarettes"
        />
        <StatCard
          icon={<DollarSign className="w-6 h-6 text-red-500" />}
          title="Total Cost"
          value={statistics.totalCost.toFixed(2)}
          prefix={currency}
        />
        <StatCard
          icon={<Target className="w-6 h-6 text-purple-500" />}
          title="Money Saved"
          value={statistics.moneySaved.toFixed(2)}
          prefix={currency}
        />
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, prefix, suffix }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex items-center space-x-3 mb-2">
      {icon}
      <h3 className="text-gray-600 font-medium">{title}</h3>
    </div>
    <p className="text-2xl font-bold">
      {prefix && <span className="text-lg mr-1">{prefix}</span>}
      {value}
      {suffix && <span className="text-lg ml-1">{suffix}</span>}
    </p>
  </div>
);