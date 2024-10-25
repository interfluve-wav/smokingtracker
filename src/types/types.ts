export interface SmokingLog {
  id: string;
  date: string;
  count: number;
  cost: number;
}

export interface UserSettings {
  cigarettesPerPack: number;
  costPerPack: number;
  dailyGoal: number;
  monthlyBudget: number;
  currency: string;
  reminderEnabled: boolean;
  reminderTime: string;
}

export interface Statistics {
  totalCigarettes: number;
  totalCost: number;
  averagePerDay: number;
  moneySaved: number;
  streakDays: number;
}