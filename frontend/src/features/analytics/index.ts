export interface RevenueAnalyticsQuery {
  startDate: string;
  endDate: string;
  staffId?: string;
}

export interface DailySummary {
  date: string;
  totalRevenue: number;
  serviceRevenue: number;
  retailRevenue: number;
  cashCollected: number;
  upiCollected: number;
  cardCollected: number;
  completedAppointments: number;
}
