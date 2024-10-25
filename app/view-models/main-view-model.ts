import { Observable } from '@nativescript/core';
import { LocalNotifications } from '@nativescript/local-notifications';
import { Haptics } from '@nativescript/haptics';

export class MainViewModel extends Observable {
  private _count = 0;
  private _settings = {
    cigarettesPerPack: 20,
    costPerPack: 10,
    dailyGoal: 10,
    monthlyBudget: 200,
    currency: 'USD',
    reminderEnabled: false,
    reminderTime: '09:00'
  };
  private _statistics = {
    totalCigarettes: 0,
    totalCost: 0,
    averagePerDay: 0,
    moneySaved: 0,
    streakDays: 0
  };
  private _logs = [];
  private _currencies = ['USD', 'EUR', 'GBP'];

  constructor() {
    super();
    this.loadData();
    this.calculateStatistics();
  }

  get count() {
    return this._count;
  }

  set count(value) {
    if (this._count !== value) {
      this._count = value;
      this.notifyPropertyChange('count', value);
    }
  }

  get settings() {
    return this._settings;
  }

  get statistics() {
    return this._statistics;
  }

  get currencies() {
    return this._currencies;
  }

  incrementCount() {
    this.count++;
    Haptics.selection();
  }

  decrementCount() {
    if (this.count > 0) {
      this.count--;
      Haptics.selection();
    }
  }

  onQuickLog() {
    this.addLog(1);
    Haptics.notification({
      type: Haptics.NotificationType.SUCCESS
    });
  }

  saveLog() {
    if (this.count > 0) {
      this.addLog(this.count);
      this.count = 0;
      Haptics.notification({
        type: Haptics.NotificationType.SUCCESS
      });
    }
  }

  private addLog(count: number) {
    const newLog = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      count,
      cost: (count / this.settings.cigarettesPerPack) * this.settings.costPerPack
    };
    
    this._logs.push(newLog);
    this.calculateStatistics();
    this.saveData();
  }

  private calculateStatistics() {
    const totalCigarettes = this._logs.reduce((sum, log) => sum + log.count, 0);
    const totalCost = this._logs.reduce((sum, log) => sum + log.cost, 0);
    const averagePerDay = totalCigarettes / Math.max(this._logs.length, 1);
    const moneySaved = this.settings.monthlyBudget - totalCost;
    
    let streakDays = 0;
    const sortedLogs = [...this._logs].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    for (let i = 0; i < sortedLogs.length; i++) {
      if (sortedLogs[i].count <= this.settings.dailyGoal) {
        streakDays++;
      } else {
        break;
      }
    }

    this._statistics = {
      totalCigarettes,
      totalCost,
      averagePerDay,
      moneySaved,
      streakDays
    };
    
    this.notifyPropertyChange('statistics', this._statistics);
  }

  private loadData() {
    // Implementation for loading data from local storage
  }

  private saveData() {
    // Implementation for saving data to local storage
  }

  exportData() {
    // Implementation for exporting data
  }

  updateSettings(newSettings) {
    this._settings = { ...this._settings, ...newSettings };
    this.notifyPropertyChange('settings', this._settings);
    this.saveData();
    this.updateReminder();
  }

  private updateReminder() {
    if (this.settings.reminderEnabled) {
      const [hours, minutes] = this.settings.reminderTime.split(':');
      LocalNotifications.schedule([{
        id: 1,
        title: 'Smoking Tracker',
        body: 'Remember to log your cigarettes for today',
        ticker: 'Smoking Tracker Reminder',
        hour: parseInt(hours, 10),
        minute: parseInt(minutes, 10),
        repeatInterval: 'day'
      }]);
    } else {
      LocalNotifications.cancel(1)