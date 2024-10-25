import React from 'react';
import { Cigarette } from 'lucide-react';
import { DailyLog } from './components/DailyLog';
import { Statistics } from './components/Statistics';
import { Settings } from './components/Settings';
import { useSmokingData } from './hooks/useSmokingData';

function App() {
  const { logs, statistics, settings, addLog, updateSettings, exportData } = useSmokingData();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Cigarette className="w-8 h-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">Smoking Tracker</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6">
          <DailyLog onLog={addLog} dailyGoal={settings.dailyGoal} />
          <Statistics 
            logs={logs}
            statistics={statistics}
            currency={settings.currency}
          />
          <Settings
            settings={settings}
            onUpdate={updateSettings}
            onExport={exportData}
          />
        </div>
      </main>
    </div>
  );
}

export default App;