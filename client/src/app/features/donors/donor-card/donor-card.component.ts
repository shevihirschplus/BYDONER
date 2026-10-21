import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DonorService } from '../../../core/services/donor.service';
import { DonationService } from '../../../core/services/donation.service';
import { EventService } from '../../../core/services/event.service';
import { ReceiptService } from '../../../core/services/receipt.service';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Donor } from '../../../models/donor.model';
import { Donation } from '../../../models/donation.model';
import { DonorEvent, EVENT_TYPE_LABELS, EventType } from '../../../models/event.model';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { DonorFormComponent } from '../donor-form/donor-form.component';
import { DonationFormComponent } from '../../donations/donation-form/donation-form.component';
import { EventFormComponent } from '../../events/event-form/event-form.component';

@Component({
  selector: 'app-donor-card',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent, DonorFormComponent, DonationFormComponent, EventFormComponent],
  template: `
    <div class="p-4 md:p-6 max-w-4xl mx-auto">
      <!-- Loading State -->
      <div *ngIf="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>

      <!-- Error State -->
      <div *ngIf="error && !loading" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Donor not found</h3>
        <p class="mt-1 text-sm text-gray-500">{{ error }}</p>
        <button (click)="goBack()" class="mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm">
          Back to Donors
        </button>
      </div>

      <!-- Donor Card -->
      <div *ngIf="donor && !loading">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <button
            (click)="goBack()"
            class="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back to Donors
          </button>
          <div *ngIf="isAdmin" class="flex gap-2">
            <button (click)="showEditForm()"
              class="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors">
              Edit
            </button>
            <button (click)="showDeleteDialog()"
              class="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors">
              Delete
            </button>
          </div>
        </div>

        <!-- Personal Information -->
        <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">{{ donor.fullName }}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span class="block text-xs font-medium text-gray-500 uppercase tracking-wide">Birthdate</span>
              <span class="block mt-1 text-sm text-gray-900">{{ donor.birthdate ? (donor.birthdate | date:'mediumDate') : 'N/A' }}</span>
            </div>
            <div>
              <span class="block text-xs font-medium text-gray-500 uppercase tracking-wide">Email</span>
              <span class="block mt-1 text-sm text-gray-900">{{ donor.email }}</span>
            </div>
            <div>
              <span class="block text-xs font-medium text-gray-500 uppercase tracking-wide">Phone</span>
              <span class="block mt-1 text-sm text-gray-900">{{ donor.phoneNumber }}</span>
            </div>
            <div>
              <span class="block text-xs font-medium text-gray-500 uppercase tracking-wide">Country / City</span>
              <span class="block mt-1 text-sm text-gray-900">{{ getLocation() }}</span>
            </div>
            <div class="sm:col-span-2">
              <span class="block text-xs font-medium text-gray-500 uppercase tracking-wide">Full Address</span>
              <span class="block mt-1 text-sm text-gray-900">{{ donor.fullAddress || 'N/A' }}</span>
            </div>
            <div>
              <span class="block text-xs font-medium text-gray-500 uppercase tracking-wide">Family Status</span>
              <span class="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium"
                [ngClass]="{
                  'bg-green-100 text-green-800': donor.familyStatus === 'Single',
                  'bg-blue-100 text-blue-800': donor.familyStatus === 'Married',
                  'bg-yellow-100 text-yellow-800': donor.familyStatus === 'Divorced',
                  'bg-gray-100 text-gray-800': donor.familyStatus === 'Widowed'
                }">
                {{ donor.familyStatus }}
              </span>
            </div>
            <div>
              <span class="block text-xs font-medium text-gray-500 uppercase tracking-wide">Number of Kids</span>
              <span class="block mt-1 text-sm text-gray-900">{{ donor.numberOfKids }}</span>
            </div>
          </div>
        </div>

        <!-- Events Section -->
        <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">
              Events
              <span class="text-sm font-normal text-gray-500 ml-2">({{ donor.events?.length || 0 }})</span>
            </h3>
            <button *ngIf="isAdmin"
              (click)="showAddEventForm()"
              class="px-3 py-1.5 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors">
              + Add Event
            </button>
          </div>

          <!-- Empty -->
          <div *ngIf="!donor.events || donor.events.length === 0" class="text-center py-8">
            <svg class="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <p class="mt-2 text-sm text-gray-500">No events recorded yet.</p>
          </div>

          <!-- Event List -->
          <div *ngIf="donor.events && donor.events.length > 0" class="space-y-2">
            <div *ngFor="let event of donor.events; let i = index"
              class="border border-gray-200 rounded-lg overflow-hidden">

              <!-- Row Header -->
              <button (click)="toggleEvent(i)"
                class="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                [attr.aria-expanded]="expandedEvents.has(i)">
                <div class="flex items-center gap-4 min-w-0">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {{ getEventTypeLabel(event.eventType) }}
                  </span>
                  <span class="text-sm text-gray-600">{{ event.eventDate | date:'mediumDate' }}</span>
                </div>
                <svg class="w-5 h-5 text-gray-400 shrink-0 transition-transform"
                  [class.rotate-180]="expandedEvents.has(i)"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <!-- Expanded Content -->
              <div *ngIf="expandedEvents.has(i)"
                class="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                  <div>
                    <span class="block text-xs font-medium text-gray-500 uppercase tracking-wide">Event Type</span>
                    <span class="block mt-1 text-sm text-gray-900">{{ getEventTypeLabel(event.eventType) }}</span>
                  </div>
                  <div>
                    <span class="block text-xs font-medium text-gray-500 uppercase tracking-wide">Date</span>
                    <span class="block mt-1 text-sm text-gray-900">{{ event.eventDate | date:'mediumDate' }}</span>
                  </div>
                  <div class="sm:col-span-2">
                    <span class="block text-xs font-medium text-gray-500 uppercase tracking-wide">Notes</span>
                    <span class="block mt-1 text-sm text-gray-900">{{ event.notes || 'No notes' }}</span>
                  </div>
                  <div *ngIf="isAdmin" class="sm:col-span-2 flex gap-2 pt-2">
                    <button (click)="showEditEventForm(event)"
                      class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                      Edit
                    </button>
                    <button (click)="showDeleteEventDialog(event)"
                      class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Donation History Section -->
        <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">
              Donation History
              <span class="text-sm font-normal text-gray-500 ml-2">({{ donor.donations.length }})</span>
            </h3>
            <button (click)="showAddDonationForm()"
              class="px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
              + Add Donation
            </button>
          </div>

          <div *ngIf="!donor.donations || donor.donations.length === 0" class="text-center py-8">
            <svg class="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="mt-2 text-sm text-gray-500">No donations recorded yet.</p>
          </div>

          <div *ngIf="donor.donations && donor.donations.length > 0" class="space-y-2">
            <div *ngFor="let donation of donor.donations; let i = index"
              class="border border-gray-200 rounded-lg overflow-hidden">
              <button (click)="toggleDonation(i)"
                class="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                [attr.aria-expanded]="expandedDonations.has(i)"
                [attr.aria-controls]="'donation-panel-' + i">
                <div class="flex items-center gap-4 min-w-0">
                  <span class="font-semibold text-gray-900 whitespace-nowrap">{{ donation.amount | currency }}</span>
                  <span class="text-sm text-gray-600">{{ donation.donationDate | date:'mediumDate' }}</span>
                  <span class="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                    {{ donation.paymentMethod }}
                  </span>
                </div>
                <svg class="w-5 h-5 text-gray-400 shrink-0 transition-transform"
                  [class.rotate-180]="expandedDonations.has(i)"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <div *ngIf="expandedDonations.has(i)" [id]="'donation-panel-' + i"
                class="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                  <div>
                    <span class="block text-xs font-medium text-gray-500 uppercase tracking-wide">Amount</span>
                    <span class="block mt-1 text-sm text-gray-900">{{ donation.amount | currency }}</span>
                  </div>
                  <div>
                    <span class="block text-xs font-medium text-gray-500 uppercase tracking-wide">Date</span>
                    <span class="block mt-1 text-sm text-gray-900">{{ donation.donationDate | date:'mediumDate' }}</span>
                  </div>
                  <div>
                    <span class="block text-xs font-medium text-gray-500 uppercase tracking-wide">Payment Method</span>
                    <span class="block mt-1 text-sm text-gray-900">{{ donation.paymentMethod }}</span>
                  </div>
                  <div>
                    <span class="block text-xs font-medium text-gray-500 uppercase tracking-wide">Receipt Number</span>
                    <span class="block mt-1 text-sm text-gray-900">{{ donation.receiptNumber || 'N/A' }}</span>
                  </div>
                  <div class="sm:col-span-2">
                    <span class="block text-xs font-medium text-gray-500 uppercase tracking-wide">Notes</span>
                    <span class="block mt-1 text-sm text-gray-900">{{ donation.notes || 'No notes' }}</span>
                  </div>
                  <div class="sm:col-span-2 flex flex-wrap gap-2 pt-2">
                    <button (click)="downloadPdf(donation)"
                      class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      PDF
                    </button>
                    <button (click)="downloadDocx(donation)"
                      class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      Word
                    </button>
                    <button *ngIf="isAdmin" (click)="showEditDonation(donation)"
                      class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                      Edit
                    </button>
                    <button *ngIf="isAdmin" (click)="showDeleteDonationDialog(donation)"
                      class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Confirm Delete Donor -->
      <app-confirm-dialog
        [visible]="showDeleteConfirm"
        title="Delete Donor"
        message="Are you sure you want to delete this donor? This will also remove all associated records. This action cannot be undone."
        confirmText="Delete"
        (confirmed)="onDeleteConfirmed()"
        (cancelled)="onDeleteCancelled()"
      ></app-confirm-dialog>

      <!-- Edit Donor Form -->
      <app-donor-form
        [visible]="showEditFormModal"
        [donor]="donor"
        (saved)="onDonorSaved()"
        (closed)="onEditFormClosed()"
      ></app-donor-form>

      <!-- Confirm Delete Donation -->
      <app-confirm-dialog
        [visible]="showDonationDeleteConfirm"
        title="Delete Donation"
        message="Are you sure you want to delete this donation? This action cannot be undone."
        confirmText="Delete"
        (confirmed)="onDonationDeleteConfirmed()"
        (cancelled)="onDonationDeleteCancelled()"
      ></app-confirm-dialog>

      <!-- Donation Form -->
      <app-donation-form
        [visible]="showDonationEditForm"
        [donorId]="donor?.id || ''"
        [donation]="donationToEdit"
        (saved)="onDonationSaved()"
        (closed)="onDonationEditClosed()"
      ></app-donation-form>

      <!-- Confirm Delete Event -->
      <app-confirm-dialog
        [visible]="showEventDeleteConfirm"
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
        confirmText="Delete"
        (confirmed)="onEventDeleteConfirmed()"
        (cancelled)="onEventDeleteCancelled()"
      ></app-confirm-dialog>

      <!-- Event Form -->
      <app-event-form
        [visible]="showEventEditForm"
        [donorId]="donor?.id || ''"
        [event]="eventToEdit"
        (saved)="onEventSaved()"
        (closed)="onEventEditClosed()"
      ></app-event-form>
    </div>
  `
})
export class DonorCardComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private donorService = inject(DonorService);
  private donationService = inject(DonationService);
  private eventService = inject(EventService);
  private receiptService = inject(ReceiptService);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);

  donor: Donor | null = null;
  loading = true;
  error: string | null = null;
  isAdmin = false;

  expandedDonations = new Set<number>();
  expandedEvents = new Set<number>();

  showDeleteConfirm = false;
  showEditFormModal = false;

  showDonationDeleteConfirm = false;
  donationToDelete: Donation | null = null;
  showDonationEditForm = false;
  donationToEdit: Donation | null = null;

  showEventDeleteConfirm = false;
  eventToDelete: DonorEvent | null = null;
  showEventEditForm = false;
  eventToEdit: DonorEvent | null = null;

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDonor(id);
    } else {
      this.error = 'No donor ID provided.';
      this.loading = false;
    }
  }

  goBack(): void { this.router.navigate(['/donors']); }

  getLocation(): string {
    const parts = [this.donor?.city, this.donor?.country].filter(Boolean);
    return parts.length ? parts.join(', ') : 'N/A';
  }

  getEventTypeLabel(type: EventType): string {
    return EVENT_TYPE_LABELS[type] ?? type;
  }

  // --- Donor ---
  showDeleteDialog(): void { this.showDeleteConfirm = true; }
  onDeleteCancelled(): void { this.showDeleteConfirm = false; }
  onDeleteConfirmed(): void {
    if (!this.donor) return;
    this.donorService.delete(this.donor.id).subscribe({
      next: () => { this.showDeleteConfirm = false; this.notificationService.success('Donor deleted.'); this.router.navigate(['/donors']); },
      error: () => { this.showDeleteConfirm = false; this.notificationService.error('Failed to delete donor.'); }
    });
  }
  showEditForm(): void { this.showEditFormModal = true; }
  onEditFormClosed(): void { this.showEditFormModal = false; }
  onDonorSaved(): void { this.showEditFormModal = false; if (this.donor) this.loadDonor(this.donor.id); }

  // --- Donations ---
  toggleDonation(i: number): void { this.expandedDonations.has(i) ? this.expandedDonations.delete(i) : this.expandedDonations.add(i); }
  showAddDonationForm(): void { this.donationToEdit = null; this.showDonationEditForm = true; }
  showEditDonation(d: Donation): void { this.donationToEdit = d; this.showDonationEditForm = true; }
  onDonationEditClosed(): void { this.showDonationEditForm = false; this.donationToEdit = null; }
  onDonationSaved(): void { this.showDonationEditForm = false; this.donationToEdit = null; if (this.donor) this.loadDonor(this.donor.id); }
  showDeleteDonationDialog(d: Donation): void { this.donationToDelete = d; this.showDonationDeleteConfirm = true; }
  onDonationDeleteCancelled(): void { this.showDonationDeleteConfirm = false; this.donationToDelete = null; }
  onDonationDeleteConfirmed(): void {
    if (!this.donationToDelete) return;
    this.donationService.delete(this.donationToDelete.id).subscribe({
      next: () => { this.showDonationDeleteConfirm = false; this.donationToDelete = null; this.notificationService.success('Donation deleted.'); if (this.donor) this.loadDonor(this.donor.id); },
      error: () => { this.showDonationDeleteConfirm = false; this.donationToDelete = null; this.notificationService.error('Failed to delete donation.'); }
    });
  }

  // --- Events ---
  toggleEvent(i: number): void { this.expandedEvents.has(i) ? this.expandedEvents.delete(i) : this.expandedEvents.add(i); }
  showAddEventForm(): void { this.eventToEdit = null; this.showEventEditForm = true; }
  showEditEventForm(e: DonorEvent): void { this.eventToEdit = e; this.showEventEditForm = true; }
  onEventEditClosed(): void { this.showEventEditForm = false; this.eventToEdit = null; }
  onEventSaved(): void { this.showEventEditForm = false; this.eventToEdit = null; if (this.donor) this.loadDonor(this.donor.id); }
  showDeleteEventDialog(e: DonorEvent): void { this.eventToDelete = e; this.showEventDeleteConfirm = true; }
  onEventDeleteCancelled(): void { this.showEventDeleteConfirm = false; this.eventToDelete = null; }
  onEventDeleteConfirmed(): void {
    if (!this.eventToDelete) return;
    this.eventService.delete(this.eventToDelete.id).subscribe({
      next: () => { this.showEventDeleteConfirm = false; this.eventToDelete = null; this.notificationService.success('Event deleted.'); if (this.donor) this.loadDonor(this.donor.id); },
      error: () => { this.showEventDeleteConfirm = false; this.eventToDelete = null; this.notificationService.error('Failed to delete event.'); }
    });
  }

  // --- Receipts ---
  downloadPdf(donation: Donation): void {
    this.receiptService.downloadPdf(donation.id).subscribe({
      next: (blob) => { this.triggerDownload(blob, `receipt-${donation.receiptNumber || donation.id}.pdf`); this.notificationService.success('PDF downloaded.'); },
      error: () => { this.notificationService.error('Failed to generate PDF.'); }
    });
  }
  downloadDocx(donation: Donation): void {
    this.receiptService.downloadDocx(donation.id).subscribe({
      next: (blob) => { this.triggerDownload(blob, `receipt-${donation.receiptNumber || donation.id}.docx`); this.notificationService.success('Word receipt downloaded.'); },
      error: () => { this.notificationService.error('Failed to generate Word receipt.'); }
    });
  }
  private triggerDownload(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }

  private loadDonor(id: string): void {
    this.loading = true;
    this.donorService.getById(id).subscribe({
      next: (donor) => { this.donor = donor; this.loading = false; },
      error: () => { this.error = 'Could not load donor details.'; this.loading = false; }
    });
  }
}
