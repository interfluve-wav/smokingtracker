import React, { useState } from 'react';
import { Plus, Minus, Save, Cigarette } from 'lucide-react';

interface DailyLogProps {
  onLog: (count: number) => void;
  dailyGoal: number;
}

export const DailyLog: React.FC<DailyLogProps> = ({ onLog, dailyGoal }) => {
  const [count, setCount] = useState(0);

  const handleSave = () => {
    if (count > 0) {
      onLog(count);
      setCount(0);
    }
  };

  const handleQuickLog = () => {
    onLog(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Daily Log</h2>
        <button
          onClick={handleQuickLog}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <Cigarette className="w-5 h-5" />
          <span>Quick Log</span>
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            onClick={() => setCount(Math.max(0, count - 1))}
            className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
          >
            <Minus className="w-6 h-6 text-red-600" />
          </button>
          <span className="text-4xl font-bold w-16 text-center">{count}</span>
          <button
            onClick={() => setCount(count + 1)}
            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            <Plus className="w-6 h-6 text-blue-600" />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-gray-600 mb-2">
            Daily Goal: {dailyGoal} cigarettes
          </p>
          <button
            onClick={handleSave}
            disabled={count === 0}
            className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            <span>Save Log</span>
          </button>
        </div>
      </div>
    </div>
  );
};