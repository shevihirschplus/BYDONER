import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { DonorService } from '../../../core/services/donor.service';
import { AuthService } from '../../../core/services/auth.service';
import { Donor, DonorSearchFilter, FamilyStatus, PagedResult } from '../../../models/donor.model';
import { DonorFormComponent } from '../donor-form/donor-form.component';

@Component({
  selector: 'app-donor-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DonorFormComponent],
  template: `
    <div class="p-4 md:p-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Donors</h1>
        <button
          *ngIf="isAdmin"
          (click)="showAddDonorForm()"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          + Add Donor
        </button>
      </div>

      <div class="flex flex-col md:flex-row gap-6">
        <!-- Filter Panel - Sidebar on desktop, collapsible on mobile -->
        <aside class="w-full md:w-72 shrink-0">
          <!-- Mobile toggle -->
          <button
            (click)="filtersOpen = !filtersOpen"
            class="md:hidden w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm mb-2"
            aria-expanded="filtersOpen"
            aria-controls="filter-panel"
          >
            <span class="font-medium text-gray-700">Filters</span>
            <svg
              class="w-5 h-5 text-gray-500 transition-transform"
              [class.rotate-180]="filtersOpen"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <!-- Filter content -->
          <div
            id="filter-panel"
            class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-4"
            [class.hidden]="!filtersOpen"
            [class.md:block]="true"
          >
            <h2 class="font-semibold text-gray-800 text-sm uppercase tracking-wide">Filters</h2>

            <!-- Family Status -->
            <div>
              <label for="familyStatus" class="block text-sm font-medium text-gray-700 mb-1">Family Status</label>
              <select
                id="familyStatus"
                [(ngModel)]="filter.familyStatus"
                (ngModelChange)="onFilterChange()"
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option [ngValue]="undefined">All</option>
                <option *ngFor="let status of familyStatuses" [ngValue]="status">{{ status }}</option>
              </select>
            </div>

            <!-- Location -->
            <div>
              <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                id="location"
                type="text"
                [(ngModel)]="filter.location"
                (ngModelChange)="onFilterChange()"
                placeholder="City or country..."
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <!-- Amount Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Donation Amount Range</label>
              <div class="flex gap-2">
                <input
                  type="number"
                  [(ngModel)]="filter.minAmount"
                  (ngModelChange)="onFilterChange()"
                  placeholder="Min"
                  class="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="number"
                  [(ngModel)]="filter.maxAmount"
                  (ngModelChange)="onFilterChange()"
                  placeholder="Max"
                  class="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <!-- Date Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <div class="space-y-2">
                <input
                  type="date"
                  [(ngModel)]="filter.fromDate"
                  (ngModelChange)="onFilterChange()"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="From"
                />
                <input
                  type="date"
                  [(ngModel)]="filter.toDate"
                  (ngModelChange)="onFilterChange()"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="To"
                />
              </div>
            </div>

            <!-- Clear Filters -->
            <button
              (click)="clearFilters()"
              class="w-full text-sm text-blue-600 hover:text-blue-800 font-medium py-2"
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 min-w-0">
          <!-- Search Bar -->
          <div class="mb-4">
            <div class="relative">
              <svg
                class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (ngModelChange)="onSearchChange($event)"
                placeholder="Search by name, email, or phone..."
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Search donors"
              />
            </div>
          </div>

          <!-- Loading State -->
          <div *ngIf="loading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>

          <!-- Empty State -->
          <div *ngIf="!loading && donors.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No donors found</h3>
            <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>

          <!-- Donor Cards Grid -->
          <div *ngIf="!loading && donors.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              *ngFor="let donor of donors"
              (click)="onDonorClick(donor)"
              class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
              role="button"
              [attr.aria-label]="'View donor ' + donor.fullName"
              tabindex="0"
              (keydown.enter)="onDonorClick(donor)"
            >
              <!-- Donor Name -->
              <h3 class="font-semibold text-gray-900 text-lg truncate">{{ donor.fullName }}</h3>

              <!-- Email -->
              <div class="flex items-center gap-2 mt-2 text-sm text-gray-600">
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span class="truncate">{{ donor.email }}</span>
              </div>

              <!-- Phone -->
              <div class="flex items-center gap-2 mt-1 text-sm text-gray-600">
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>{{ donor.phoneNumber }}</span>
              </div>

              <!-- Family Status Badge -->
              <div class="mt-3">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  [ngClass]="{
                    'bg-green-100 text-green-800': donor.familyStatus === 'Single',
                    'bg-blue-100 text-blue-800': donor.familyStatus === 'Married',
                    'bg-yellow-100 text-yellow-800': donor.familyStatus === 'Divorced',
                    'bg-gray-100 text-gray-800': donor.familyStatus === 'Widowed'
                  }"
                >
                  {{ donor.familyStatus }}
                </span>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div *ngIf="!loading && totalCount > 0" class="flex items-center justify-between mt-6 px-1">
            <p class="text-sm text-gray-700">
              Showing {{ startItem }} to {{ endItem }} of {{ totalCount }} donors
            </p>
            <div class="flex gap-2">
              <button
                (click)="previousPage()"
                [disabled]="currentPage <= 1"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                (click)="nextPage()"
                [disabled]="currentPage >= totalPages"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>

      <!-- Add Donor Form Modal -->
      <app-donor-form
        [visible]="showDonorForm"
        [donor]="null"
        (saved)="onDonorCreated()"
        (closed)="showDonorForm = false"
      ></app-donor-form>
    </div>
  `
})
export class DonorListComponent implements OnInit, OnDestroy {
  private donorService = inject(DonorService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();
  private searchSubject$ = new Subject<string>();

  donors: Donor[] = [];
  loading = false;
  searchQuery = '';
  filtersOpen = false;
  showDonorForm = false;
  isAdmin = false;

  // Pagination
  currentPage = 1;
  pageSize = 20;
  totalCount = 0;

  // Filter state
  filter: DonorSearchFilter = {};

  // Family status options
  familyStatuses = Object.values(FamilyStatus);

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  get startItem(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalCount);
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.searchSubject$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(query => {
        this.filter.query = query || undefined;
        this.currentPage = 1;
        this.loadDonors();
      });

    this.loadDonors();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchChange(query: string): void {
    this.searchSubject$.next(query);
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadDonors();
  }

  clearFilters(): void {
    this.filter = {};
    this.searchQuery = '';
    this.currentPage = 1;
    this.loadDonors();
  }

  onDonorClick(donor: Donor): void {
    this.router.navigate(['/donors', donor.id]);
  }

  showAddDonorForm(): void {
    this.showDonorForm = true;
  }

  onDonorCreated(): void {
    this.showDonorForm = false;
    this.loadDonors();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadDonors();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadDonors();
    }
  }

  private loadDonors(): void {
    this.loading = true;
    const searchFilter: DonorSearchFilter = {
      ...this.filter,
      page: this.currentPage,
      pageSize: this.pageSize
    };

    this.donorService.search(searchFilter)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: PagedResult<Donor>) => {
          this.donors = result.items;
          this.totalCount = result.totalCount;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }
}
