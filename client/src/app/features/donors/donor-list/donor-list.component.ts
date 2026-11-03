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
    <div>
      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
        <div>
          <h1 style="font-size:1.75rem;font-weight:800;color:#f1f5f9;margin:0;letter-spacing:-0.02em">Donors</h1>
          <p *ngIf="totalCount > 0" style="color:#64748b;font-size:0.875rem;margin:0.25rem 0 0">{{ totalCount }} total</p>
        </div>
        <button *ngIf="isAdmin" (click)="showAddDonorForm()" class="btn-primary">
          <svg style="width:1rem;height:1rem" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Add Donor
        </button>
      </div>

      <div style="display:flex;flex-direction:column;gap:1.25rem">
        <!-- Search Bar -->
        <div class="search-wrap">
          <svg class="search-icon" style="width:1.125rem;height:1.125rem" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (ngModelChange)="onSearchChange($event)"
            placeholder="Search by name, email, or phone..."
            class="dark-input"
            style="padding-left:2.5rem;padding-top:0.625rem;padding-bottom:0.625rem;font-size:0.9375rem"
            aria-label="Search donors"
          />
        </div>

        <div style="display:flex;gap:1.25rem;align-items:flex-start">
          <!-- Filter Panel -->
          <aside style="width:260px;flex-shrink:0">
            <!-- Mobile toggle -->
            <button
              (click)="filtersOpen = !filtersOpen"
              class="glass-card"
              style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:0.75rem 1rem;border-radius:0.625rem;background:none;cursor:pointer;color:#e2e8f0;font-size:0.875rem;font-weight:600;margin-bottom:0.5rem"
              [style.display]="'flex'"
              aria-expanded="filtersOpen">
              <span style="display:flex;align-items:center;gap:0.5rem">
                <svg style="width:1rem;height:1rem;color:#22d3ee" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/>
                </svg>
                Filters
              </span>
              <svg style="width:1rem;height:1rem;transition:transform 0.2s;color:#64748b" [style.transform]="filtersOpen ? 'rotate(180deg)' : 'rotate(0)'"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <div class="glass-card" id="filter-panel"
              style="border-radius:0.75rem;padding:1.25rem;display:flex;flex-direction:column;gap:1rem"
              [style.display]="filtersOpen ? 'flex' : 'none'">

              <!-- Family Status -->
              <div>
                <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem;letter-spacing:0.05em;text-transform:uppercase">Family Status</label>
                <select [(ngModel)]="filter.familyStatus" (ngModelChange)="onFilterChange()" class="dark-input"
                  style="cursor:pointer">
                  <option [ngValue]="undefined" style="background:#1e293b">All</option>
                  <option *ngFor="let status of familyStatuses" [ngValue]="status" style="background:#1e293b">{{ status }}</option>
                </select>
              </div>

              <!-- Location -->
              <div>
                <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem;letter-spacing:0.05em;text-transform:uppercase">Location</label>
                <input type="text" [(ngModel)]="filter.location" (ngModelChange)="onFilterChange()"
                  placeholder="City or country..." class="dark-input"/>
              </div>

              <!-- Amount Range -->
              <div>
                <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem;letter-spacing:0.05em;text-transform:uppercase">Donation Amount</label>
                <div style="display:flex;gap:0.5rem">
                  <input type="number" [(ngModel)]="filter.minAmount" (ngModelChange)="onFilterChange()"
                    placeholder="Min" class="dark-input" style="width:50%"/>
                  <input type="number" [(ngModel)]="filter.maxAmount" (ngModelChange)="onFilterChange()"
                    placeholder="Max" class="dark-input" style="width:50%"/>
                </div>
              </div>

              <!-- Date Range -->
              <div>
                <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem;letter-spacing:0.05em;text-transform:uppercase">Date Range</label>
                <div style="display:flex;flex-direction:column;gap:0.375rem">
                  <input type="date" [(ngModel)]="filter.fromDate" (ngModelChange)="onFilterChange()" class="dark-input"/>
                  <input type="date" [(ngModel)]="filter.toDate" (ngModelChange)="onFilterChange()" class="dark-input"/>
                </div>
              </div>

              <button (click)="clearFilters()"
                style="width:100%;padding:0.5rem;font-size:0.8125rem;font-weight:600;color:#22d3ee;background:rgba(34,211,238,0.06);border:1px solid rgba(34,211,238,0.2);border-radius:0.5rem;cursor:pointer;transition:background 0.15s">
                Clear All Filters
              </button>
            </div>
          </aside>

          <!-- Main Content -->
          <main style="flex:1;min-width:0">

            <!-- Loading State -->
            <div *ngIf="loading" style="display:flex;justify-content:center;align-items:center;padding:4rem 0">
              <div class="spinner"></div>
            </div>

            <!-- Empty State -->
            <div *ngIf="!loading && donors.length === 0" style="text-align:center;padding:4rem 2rem">
              <div style="width:64px;height:64px;border-radius:50%;background:rgba(34,211,238,0.08);border:1px solid rgba(34,211,238,0.15);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem">
                <svg style="width:2rem;height:2rem;color:#334155" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h3 style="font-size:1rem;font-weight:600;color:#94a3b8;margin:0 0 0.375rem">No donors found</h3>
              <p style="font-size:0.875rem;color:#475569;margin:0">Try adjusting your search or filters.</p>
            </div>

            <!-- Donor Cards Grid -->
            <div *ngIf="!loading && donors.length > 0"
              style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:0.875rem">
              <div
                *ngFor="let donor of donors"
                (click)="onDonorClick(donor)"
                class="donor-card"
                role="button"
                [attr.aria-label]="'View donor ' + donor.fullName"
                tabindex="0"
                (keydown.enter)="onDonorClick(donor)">

                <!-- Avatar + Name -->
                <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.875rem">
                  <div style="width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,rgba(6,182,212,0.3),rgba(99,102,241,0.3));border:1px solid rgba(34,211,238,0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0">
                    <span style="font-size:1rem;font-weight:700;color:#22d3ee">{{ donor.fullName.charAt(0).toUpperCase() }}</span>
                  </div>
                  <h3 style="font-size:0.9375rem;font-weight:700;color:#f1f5f9;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ donor.fullName }}</h3>
                </div>

                <!-- Email -->
                <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.375rem">
                  <svg style="width:0.875rem;height:0.875rem;color:#475569;flex-shrink:0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span style="font-size:0.8125rem;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ donor.email }}</span>
                </div>

                <!-- Phone -->
                <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.875rem">
                  <svg style="width:0.875rem;height:0.875rem;color:#475569;flex-shrink:0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span style="font-size:0.8125rem;color:#64748b">{{ donor.phoneNumber }}</span>
                </div>

                <!-- Status badge -->
                <span class="badge"
                  [class]="donor.familyStatus === 'Single' ? 'badge-emerald' :
                            donor.familyStatus === 'Married' ? 'badge-cyan' :
                            donor.familyStatus === 'Divorced' ? 'badge-amber' : 'badge-slate'">
                  {{ donor.familyStatus }}
                </span>
              </div>
            </div>

            <!-- Pagination -->
            <div *ngIf="!loading && totalCount > 0" style="display:flex;align-items:center;justify-content:space-between;margin-top:1.25rem;padding:0 0.25rem">
              <p style="font-size:0.8125rem;color:#64748b">
                Showing {{ startItem }}–{{ endItem }} of {{ totalCount }}
              </p>
              <div style="display:flex;gap:0.5rem">
                <button (click)="previousPage()" [disabled]="currentPage <= 1" class="btn-secondary"
                  style="padding:0.4rem 0.875rem;font-size:0.8125rem">
                  ← Prev
                </button>
                <span style="display:flex;align-items:center;padding:0 0.625rem;font-size:0.8125rem;color:#64748b">
                  {{ currentPage }} / {{ totalPages }}
                </span>
                <button (click)="nextPage()" [disabled]="currentPage >= totalPages" class="btn-secondary"
                  style="padding:0.4rem 0.875rem;font-size:0.8125rem">
                  Next →
                </button>
              </div>
            </div>
          </main>
        </div>
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
