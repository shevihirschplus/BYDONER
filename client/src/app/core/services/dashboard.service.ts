import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardSummary, MonthlyStats, TopDonor, UpcomingEvent } from '../../models/dashboard.model';
import { Donation } from '../../models/donation.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private baseUrl = '/api/dashboard';

  getSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.baseUrl}/summary`);
  }

  getRecentDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${this.baseUrl}/recent-donations`);
  }

  getTopDonors(): Observable<TopDonor[]> {
    return this.http.get<TopDonor[]>(`${this.baseUrl}/top-donors`);
  }

  getMonthlyStats(): Observable<MonthlyStats[]> {
    return this.http.get<MonthlyStats[]>(`${this.baseUrl}/monthly-stats`);
  }

  getUpcomingEvents(): Observable<UpcomingEvent[]> {
    return this.http.get<UpcomingEvent[]>(`${this.baseUrl}/upcoming-events`);
  }
}
