import { useState, useEffect } from 'react';
import { SmokingLog, Statistics, UserSettings } from '../types/types';

export const useSmokingData = () => {
  const [logs, setLogs] = useState<SmokingLog[]>([
    {
      id: '1',
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      count: 15,
      cost: 7.5,
    },
    {
      id: '2',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      count: 12,
      cost: 6,
    },
    {
      id: '3',
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      count: 10,
      cost: 5,
    },
    {
      id: '4',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      count: 8,
      cost: 4,
    },
    {
      id: '5',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      count: 7,
      cost: 3.5,
    },
    {
      id: '6',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      count: 5,
      cost: 2.5,
    },
  ]);

  const [settings, setSettings] = useState<UserSettings>({
    cigarettesPerPack: 20,
    costPerPack: 10,
    dailyGoal: 10,
    monthlyBudget: 200,
    currency: 'USD',
    reminderEnabled: false,
    reminderTime: '09:00',
  });

  const [statistics, setStatistics] = useState<Statistics>({
    totalCigarettes: 0,
    totalCost: 0,
    averagePerDay: 0,
    moneySaved: 0,
    streakDays: 0,
  });

  const calculateStatistics = () => {
    const totalCigarettes = logs.reduce((sum, log) => sum + log.count, 0);
    const totalCost = logs.reduce((sum, log) => sum + log.cost, 0);
    const averagePerDay = totalCigarettes / Math.max(logs.length, 1);
    const moneySaved = settings.monthlyBudget - totalCost;
    
    let streakDays = 0;
    const sortedLogs = [...logs].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    for (let i = 0; i < sortedLogs.length; i++) {
      if (sortedLogs[i].count <= settings.dailyGoal) {
        streakDays++;
      } else {
        break;
      }
    }

    setStatistics({
      totalCigarettes,
      totalCost,
      averagePerDay,
      moneySaved,
      streakDays,
    });
  };

  const addLog = (count: number) => {
    const newLog: SmokingLog = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      count,
      cost: (count / settings.cigarettesPerPack) * settings.costPerPack,
    };
    setLogs([...logs, newLog]);
  };

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings({ ...settings, ...newSettings });
  };

  const exportData = () => {
    const csvContent = [
      ['Date', 'Count', 'Cost'].join(','),
      ...logs.map(log => [
        new Date(log.date).toLocaleDateString(),
        log.count,
        log.cost,
      ].join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'smoking-data.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  useEffect(() => {
    calculateStatistics();
  }, [logs, settings]);

  return {
    logs,
    statistics,
    settings,
    addLog,
    updateSettings,
    exportData,
  };
};