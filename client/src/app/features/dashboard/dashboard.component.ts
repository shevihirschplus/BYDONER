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
    <div *ngIf="loading" class="flex items-center justify-center min-h-[400px]">
      <div class="text-gray-500 text-lg">Loading dashboard...</div>
    </div>

    <!-- Dashboard Content -->
    <div *ngIf="!loading" class="p-6 space-y-6">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Total Donors Card -->
        <div class="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Total Donors</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">{{ summary?.totalDonors ?? 0 }}</p>
            </div>
            <div class="bg-blue-100 rounded-full p-3">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Total Donations Card -->
        <div class="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Total Donations</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">{{ summary?.totalDonations ?? 0 | currency }}</p>
            </div>
            <div class="bg-green-100 rounded-full p-3">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Donations -->
        <div class="bg-white rounded-lg shadow border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">Recent Donations</h2>
          </div>
          <div class="p-6">
            <div *ngIf="recentDonations.length === 0" class="text-gray-500 text-sm">
              No donations recorded yet.
            </div>
            <div class="space-y-3">
              <div *ngFor="let donation of recentDonations"
                class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ donation.amount | currency }}</p>
                  <p class="text-xs text-gray-500">{{ donation.donationDate | date:'mediumDate' }}</p>
                </div>
                <span class="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                  {{ formatPaymentMethod(donation.paymentMethod) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Donors -->
        <div class="bg-white rounded-lg shadow border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">Top Donors</h2>
          </div>
          <div class="p-6">
            <div *ngIf="topDonors.length === 0" class="text-gray-500 text-sm">
              No donors found.
            </div>
            <div class="space-y-3">
              <div *ngFor="let donor of topDonors; let i = index"
                class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div class="flex items-center gap-3">
                  <span class="text-sm font-bold text-gray-400 w-6">{{ i + 1 }}</span>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ donor.fullName }}</p>
                    <p class="text-xs text-gray-500">{{ donor.donationCount }} donation{{ donor.donationCount !== 1 ? 's' : '' }}</p>
                  </div>
                </div>
                <span class="text-sm font-semibold text-gray-900">{{ donor.totalAmount | currency }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Events -->
      <div class="bg-white rounded-lg shadow border border-gray-200">
        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">Upcoming Events
            <span class="ml-2 text-sm font-normal text-gray-500">(next 30 days)</span>
          </h2>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {{ upcomingEvents.length }} event{{ upcomingEvents.length !== 1 ? 's' : '' }}
          </span>
        </div>
        <div class="p-6">
          <div *ngIf="upcomingEvents.length === 0" class="text-center py-6">
            <svg class="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <p class="mt-2 text-sm text-gray-500">No upcoming events in the next 30 days.</p>
          </div>
          <div class="space-y-3">
            <div *ngFor="let event of upcomingEvents"
              class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div class="flex items-center gap-3 min-w-0">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 shrink-0">
                  {{ formatEventType(event.eventType) }}
                </span>
                <div class="min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">{{ event.donorName }}</p>
                  <p class="text-xs text-gray-500">{{ event.eventDate | date:'mediumDate' }}</p>
                </div>
              </div>
              <span class="text-xs font-semibold shrink-0 ml-3"
                [ngClass]="{
                  'text-red-600': event.daysUntil <= 3,
                  'text-orange-500': event.daysUntil > 3 && event.daysUntil <= 7,
                  'text-gray-500': event.daysUntil > 7
                }">
                {{ event.daysUntil === 0 ? 'Today' : event.daysUntil === 1 ? 'Tomorrow' : 'In ' + event.daysUntil + ' days' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Monthly Stats Chart -->
      <div class="bg-white rounded-lg shadow border border-gray-200">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Monthly Donations ({{ currentYear }})</h2>
        </div>
        <div class="p-6">
          <div *ngIf="monthlyStats.length === 0" class="text-gray-500 text-sm">
            No donation data for this year.
          </div>
          <div class="space-y-3">
            <div *ngFor="let stat of monthlyStats" class="flex items-center gap-4">
              <span class="text-sm text-gray-600 w-12 shrink-0">{{ getMonthName(stat.month) }}</span>
              <div class="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                <div
                  class="bg-blue-500 h-full rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                  [style.width.%]="getBarWidth(stat.total)">
                  <span *ngIf="getBarWidth(stat.total) > 15" class="text-xs text-white font-medium">
                    {{ stat.total | currency:'USD':'symbol':'1.0-0' }}
                  </span>
                </div>
              </div>
              <span *ngIf="getBarWidth(stat.total) <= 15" class="text-xs text-gray-600 w-16 text-right">
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
      default: return type;
    }
  }
}
