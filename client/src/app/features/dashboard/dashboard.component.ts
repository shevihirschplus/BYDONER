import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { DashboardService } from '../../core/services/dashboard.service';
import { DashboardSummary, MonthlyStats, TopDonor, UpcomingEvent } from '../../models/dashboard.model';
import { Donation } from '../../models/donation.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  template: `
    <!-- Loading State -->
    <div *ngIf="loading" style="display:flex;align-items:center;justify-content:center;min-height:400px">
      <div style="text-align:center">
        <div class="spinner" style="margin:0 auto 1rem"></div>
        <p style="color:#64748b;font-size:0.875rem">Loading dashboard...</p>
      </div>
    </div>

    <!-- Dashboard Content -->
    <div *ngIf="!loading" style="display:flex;flex-direction:column;gap:1.5rem">

      <!-- Page header -->
      <div style="display:flex;align-items:baseline;gap:0.75rem">
        <h1 style="font-size:1.75rem;font-weight:800;color:#f1f5f9;margin:0;letter-spacing:-0.02em">Dashboard</h1>
        <span style="color:#475569;font-size:0.875rem">Overview</span>
      </div>

      <!-- Stats Cards Row -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem">

        <!-- Total Donors -->
        <div class="glass-card stat-card-cyan glow-cyan" style="padding:1.5rem;border-radius:0.875rem">
          <div style="display:flex;align-items:flex-start;justify-content:space-between">
            <div>
              <p style="color:#94a3b8;font-size:0.75rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 0.5rem">Total Donors</p>
              <p style="font-size:2.5rem;font-weight:800;color:#22d3ee;line-height:1;margin:0" class="animate-count">{{ summary?.totalDonors ?? 0 }}</p>
            </div>
            <div style="width:48px;height:48px;border-radius:0.75rem;background:rgba(34,211,238,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <svg style="width:1.5rem;height:1.5rem;color:#22d3ee" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Total Donations -->
        <div class="glass-card stat-card-emerald glow-emerald" style="padding:1.5rem;border-radius:0.875rem">
          <div style="display:flex;align-items:flex-start;justify-content:space-between">
            <div>
              <p style="color:#94a3b8;font-size:0.75rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 0.5rem">Total Raised</p>
              <p style="font-size:2rem;font-weight:800;color:#34d399;line-height:1;margin:0" class="animate-count">{{ summary?.totalDonations ?? 0 | currency }}</p>
            </div>
            <div style="width:48px;height:48px;border-radius:0.75rem;background:rgba(52,211,153,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <svg style="width:1.5rem;height:1.5rem;color:#34d399" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Upcoming Events -->
        <div class="glass-card stat-card-violet glow-violet" style="padding:1.5rem;border-radius:0.875rem">
          <div style="display:flex;align-items:flex-start;justify-content:space-between">
            <div>
              <p style="color:#94a3b8;font-size:0.75rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 0.5rem">Upcoming Events</p>
              <p style="font-size:2.5rem;font-weight:800;color:#a78bfa;line-height:1;margin:0" class="animate-count">{{ upcomingEvents.length }}</p>
            </div>
            <div style="width:48px;height:48px;border-radius:0.75rem;background:rgba(139,92,246,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <svg style="width:1.5rem;height:1.5rem;color:#a78bfa" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Two-col grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem">

        <!-- Recent Donations -->
        <div class="glass-card" style="border-radius:0.875rem;overflow:hidden;min-width:0">
          <div style="padding:1.25rem 1.5rem;border-bottom:1px solid rgba(100,116,139,0.15);display:flex;align-items:center;gap:0.625rem">
            <div style="width:8px;height:8px;border-radius:50%;background:#22d3ee;box-shadow:0 0 8px #22d3ee"></div>
            <h2 style="font-size:0.9375rem;font-weight:700;color:#f1f5f9;margin:0">Recent Donations</h2>
          </div>
          <div style="padding:1rem 1.5rem">
            <div *ngIf="recentDonations.length === 0" style="color:#475569;font-size:0.875rem;padding:1rem 0;text-align:center">
              No donations recorded yet.
            </div>
            <div style="display:flex;flex-direction:column;gap:0.25rem">
              <div *ngFor="let donation of recentDonations"
                class="hover-row"
                style="display:flex;align-items:center;justify-content:space-between;padding:0.625rem 0.5rem">
                <div>
                  <p style="font-size:0.9375rem;font-weight:700;color:#22d3ee;margin:0">{{ donation.amount | currency }}</p>
                  <p style="font-size:0.75rem;color:#64748b;margin:0.125rem 0 0">{{ donation.donationDate | date:'mediumDate' }}</p>
                </div>
                <span class="badge badge-slate">{{ formatPaymentMethod(donation.paymentMethod) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Donors -->
        <div class="glass-card" style="border-radius:0.875rem;overflow:hidden;min-width:0">
          <div style="padding:1.25rem 1.5rem;border-bottom:1px solid rgba(100,116,139,0.15);display:flex;align-items:center;gap:0.625rem">
            <div style="width:8px;height:8px;border-radius:50%;background:#34d399;box-shadow:0 0 8px #34d399"></div>
            <h2 style="font-size:0.9375rem;font-weight:700;color:#f1f5f9;margin:0">Top Donors</h2>
          </div>
          <div style="padding:1rem 1.5rem">
            <div *ngIf="topDonors.length === 0" style="color:#475569;font-size:0.875rem;padding:1rem 0;text-align:center">
              No donors found.
            </div>
            <div style="display:flex;flex-direction:column;gap:0.25rem">
              <div *ngFor="let donor of topDonors; let i = index"
                class="hover-row"
                style="display:flex;align-items:center;justify-content:space-between;padding:0.625rem 0.5rem">
                <div style="display:flex;align-items:center;gap:0.75rem;min-width:0">
                  <span style="font-size:0.75rem;font-weight:800;color:#475569;width:1.5rem;flex-shrink:0;text-align:center">#{{ i + 1 }}</span>
                  <div style="min-width:0">
                    <p style="font-size:0.875rem;font-weight:600;color:#e2e8f0;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ donor.fullName }}</p>
                    <p style="font-size:0.75rem;color:#64748b;margin:0.125rem 0 0">{{ donor.donationCount }} donation{{ donor.donationCount !== 1 ? 's' : '' }}</p>
                  </div>
                </div>
                <span style="font-size:0.875rem;font-weight:700;color:#34d399;flex-shrink:0;margin-left:0.5rem">{{ donor.totalAmount | currency }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Events -->
      <div class="glass-card" style="border-radius:0.875rem;overflow:hidden">
        <div style="padding:1.25rem 1.5rem;border-bottom:1px solid rgba(100,116,139,0.15);display:flex;align-items:center;justify-content:space-between">
          <div style="display:flex;align-items:center;gap:0.625rem">
            <div style="width:8px;height:8px;border-radius:50%;background:#a78bfa;box-shadow:0 0 8px #a78bfa"></div>
            <h2 style="font-size:0.9375rem;font-weight:700;color:#f1f5f9;margin:0">
              Upcoming Events
              <span style="font-size:0.75rem;font-weight:400;color:#64748b;margin-left:0.375rem">(next 30 days)</span>
            </h2>
          </div>
          <span class="badge badge-violet">{{ upcomingEvents.length }} event{{ upcomingEvents.length !== 1 ? 's' : '' }}</span>
        </div>
        <div style="padding:1rem 1.5rem">
          <div *ngIf="upcomingEvents.length === 0" style="text-align:center;padding:2rem 0">
            <svg style="width:2.5rem;height:2.5rem;color:#334155;margin:0 auto 0.75rem;display:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <p style="font-size:0.875rem;color:#475569;margin:0">No upcoming events in the next 30 days.</p>
          </div>
          <div style="display:flex;flex-direction:column;gap:0.25rem">
            <div *ngFor="let event of upcomingEvents"
              class="hover-row"
              style="display:flex;align-items:center;justify-content:space-between;padding:0.625rem 0.5rem">
              <div style="display:flex;align-items:center;gap:0.75rem;min-width:0">
                <span class="badge badge-violet" style="flex-shrink:0">{{ formatEventType(event.eventType) }}</span>
                <div style="min-width:0">
                  <p style="font-size:0.875rem;font-weight:600;color:#e2e8f0;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ event.donorName }}</p>
                  <p style="font-size:0.75rem;color:#64748b;margin:0.125rem 0 0">{{ event.eventDate | date:'mediumDate' }}</p>
                  <p *ngIf="event.notes" style="font-size:0.75rem;color:#94a3b8;margin:0.125rem 0 0;font-style:italic;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ event.notes }}</p>
                </div>
              </div>
              <span style="font-size:0.75rem;font-weight:700;flex-shrink:0;margin-left:0.75rem;white-space:nowrap"
                [style.color]="event.daysUntil <= 3 ? '#f87171' : event.daysUntil <= 7 ? '#fb923c' : '#64748b'">
                {{ event.daysUntil === 0 ? 'Today' : event.daysUntil === 1 ? 'Tomorrow' : 'In ' + event.daysUntil + ' days' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Monthly Chart -->
      <div class="glass-card" style="border-radius:0.875rem;overflow:hidden">
        <div style="padding:1.25rem 1.5rem;border-bottom:1px solid rgba(100,116,139,0.15);display:flex;align-items:center;gap:0.625rem">
          <div style="width:8px;height:8px;border-radius:50%;background:#818cf8;box-shadow:0 0 8px #818cf8"></div>
          <h2 style="font-size:0.9375rem;font-weight:700;color:#f1f5f9;margin:0">Monthly Donations — {{ currentYear }}</h2>
        </div>
        <div style="padding:1.25rem 1.5rem">
          <div *ngIf="monthlyStats.length === 0" style="color:#475569;font-size:0.875rem;text-align:center;padding:1rem 0">
            No donation data for this year.
          </div>
          <div style="display:flex;flex-direction:column;gap:0.75rem">
            <div *ngFor="let stat of monthlyStats" style="display:flex;align-items:center;gap:0.875rem">
              <span style="font-size:0.8rem;color:#64748b;width:2.5rem;flex-shrink:0;font-weight:500">{{ getMonthName(stat.month) }}</span>
              <div style="flex:1;background:#1e293b;border-radius:9999px;height:1.625rem;overflow:hidden;position:relative">
                <div
                  class="bar-fill"
                  style="background:linear-gradient(90deg,#06b6d4,#6366f1);height:100%;border-radius:9999px;display:flex;align-items:center;justify-content:flex-end;padding-right:0.625rem;min-width:2px"
                  [style.width.%]="getBarWidth(stat.total)">
                  <span *ngIf="getBarWidth(stat.total) > 15" style="font-size:0.7rem;color:white;font-weight:700;white-space:nowrap">
                    {{ stat.total | currency:'USD':'symbol':'1.0-0' }}
                  </span>
                </div>
              </div>
              <span *ngIf="getBarWidth(stat.total) <= 15" style="font-size:0.75rem;color:#64748b;width:4rem;text-align:right;flex-shrink:0">
                {{ stat.total | currency:'USD':'symbol':'1.0-0' }}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  `
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  loading = true;
  summary: DashboardSummary | null = null;
  recentDonations: Donation[] = [];
  topDonors: TopDonor[] = [];
  monthlyStats: MonthlyStats[] = [];
  upcomingEvents: UpcomingEvent[] = [];
  currentYear = new Date().getFullYear();

  private maxMonthlyTotal = 0;

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;

    forkJoin({
      summary: this.dashboardService.getSummary(),
      recentDonations: this.dashboardService.getRecentDonations(),
      topDonors: this.dashboardService.getTopDonors(),
      monthlyStats: this.dashboardService.getMonthlyStats(),
      upcomingEvents: this.dashboardService.getUpcomingEvents()
    }).subscribe({
      next: (data) => {
        this.summary = data.summary;
        this.recentDonations = data.recentDonations;
        this.topDonors = data.topDonors;
        this.monthlyStats = data.monthlyStats;
        this.upcomingEvents = data.upcomingEvents;
        this.maxMonthlyTotal = Math.max(...data.monthlyStats.map(s => s.total), 0);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getBarWidth(total: number): number {
    if (this.maxMonthlyTotal === 0) return 0;
    return (total / this.maxMonthlyTotal) * 100;
  }

  getMonthName(month: number): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1] || '';
  }

  formatPaymentMethod(method: string): string {
    switch (method) {
      case 'CreditCard': return 'Credit Card';
      case 'BankTransfer': return 'Bank Transfer';
      default: return method;
    }
  }

  formatEventType(type: string): string {
    switch (type) {
      case 'Birthday': return 'Birthday';
      case 'Yahrzeit': return 'יורצאיט';
      case 'Wedding': return 'Wedding';
      case 'BarMitzva': return 'Bar Mitzva';
      case 'Dinner': return 'Dinner';
      case 'Visit': return 'ביקור התרמה';
      case 'FollowUp': return 'Follow Up';
      default: return type;
    }
  }
}
