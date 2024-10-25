import React from 'react';
import { Save, Download } from 'lucide-react';
import { UserSettings } from '../types/types';

interface SettingsProps {
  settings: UserSettings;
  onUpdate: (settings: Partial<UserSettings>) => void;
  onExport: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ settings, onUpdate, onExport }) => {
  const handleChange = (field: keyof UserSettings, value: string | number | boolean) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Settings</h2>
        <button
          onClick={onExport}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Download className="w-5 h-5" />
          <span>Export Data</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-3">Tracking Settings</h3>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Cigarettes per pack
            </label>
            <input
              type="number"
              value={settings.cigarettesPerPack}
              onChange={(e) => handleChange('cigarettesPerPack', parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Cost per pack ({settings.currency})
            </label>
            <input
              type="number"
              value={settings.costPerPack}
              onChange={(e) => handleChange('costPerPack', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Currency
            </label>
            <select
              value={settings.currency}
              onChange={(e) => handleChange('currency', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-3">Goals & Reminders</h3>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Daily cigarette goal
            </label>
            <input
              type="number"
              value={settings.dailyGoal}
              onChange={(e) => handleChange('dailyGoal', parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Monthly budget ({settings.currency})
            </label>
            <input
              type="number"
              value={settings.monthlyBudget}
              onChange={(e) => handleChange('monthlyBudget', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.reminderEnabled}
                onChange={(e) => handleChange('reminderEnabled', e.target.checked)}
                className="rounded text-blue-600"
              />
              <span className="text-sm font-medium text-gray-700">Enable daily reminder</span>
            </label>
          </div>

          {settings.reminderEnabled && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Reminder time
              </label>
              <input
                type="time"
                value={settings.reminderTime}
                onChange={(e) => handleChange('reminderTime', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};