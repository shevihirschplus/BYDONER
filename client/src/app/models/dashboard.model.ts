export interface DashboardSummary {
  totalDonors: number;
  totalDonations: number;
}

export interface MonthlyStats {
  month: number;
  year: number;
  total: number;
  count: number;
}

export interface TopDonor {
  donorId: string;
  fullName: string;
  totalAmount: number;
  donationCount: number;
}

export interface UpcomingEvent {
  eventId: string;
  donorId: string;
  donorName: string;
  eventType: string;
  eventDate: string;
  daysUntil: number;
  notes: string | null;
}
