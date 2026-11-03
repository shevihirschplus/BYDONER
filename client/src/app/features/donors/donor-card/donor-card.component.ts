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
    <div style="max-width:56rem;margin:0 auto">
      <!-- Loading State -->
      <div *ngIf="loading" style="display:flex;justify-content:center;align-items:center;padding:4rem 0">
        <div class="spinner"></div>
      </div>

      <!-- Error State -->
      <div *ngIf="error && !loading" style="text-align:center;padding:4rem 0">
        <svg style="width:3rem;height:3rem;color:#f87171;margin:0 auto 0.75rem;display:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
        <h3 style="font-size:1rem;font-weight:600;color:#e2e8f0;margin:0 0 0.375rem">Donor not found</h3>
        <p style="font-size:0.875rem;color:#64748b;margin:0 0 1rem">{{ error }}</p>
        <button (click)="goBack()" style="color:#22d3ee;font-weight:600;font-size:0.875rem;background:none;border:none;cursor:pointer">
          Back to Donors
        </button>
      </div>

      <!-- Donor Card -->
      <div *ngIf="donor && !loading" style="display:flex;flex-direction:column">
        <!-- Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <button (click)="goBack()"
            style="display:inline-flex;align-items:center;gap:0.5rem;font-size:0.875rem;font-weight:500;color:#94a3b8;background:none;border:none;cursor:pointer;transition:color 0.15s">
            <svg style="width:1.25rem;height:1.25rem" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back to Donors
          </button>
          <div *ngIf="isAdmin" style="display:flex;gap:0.5rem">
            <button (click)="showEditForm()" class="btn-secondary">Edit</button>
            <button (click)="showDeleteDialog()" class="btn-danger">Delete</button>
          </div>
        </div>

        <!-- Personal Information -->
        <div class="glass-card" style="padding:1.5rem;margin-bottom:1.25rem">
          <h2 style="font-size:1.375rem;font-weight:800;color:#f1f5f9;margin:0 0 1.25rem">{{ donor.fullName }}</h2>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem">
            <div>
              <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">First Name</span>
              <span style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0">{{ donor.firstName || 'N/A' }}</span>
            </div>
            <div>
              <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">Last Name</span>
              <span style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0">{{ donor.lastName || 'N/A' }}</span>
            </div>
            <div>
              <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">Spouse / Partner</span>
              <span style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0">{{ donor.spouseName || 'N/A' }}</span>
            </div>
            <div>
              <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">Birthdate</span>
              <span style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0">{{ donor.birthdate ? (donor.birthdate | date:'mediumDate') : 'N/A' }}</span>
            </div>
            <div>
              <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">Email</span>
              <span style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0">{{ donor.email }}</span>
            </div>
            <div>
              <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">Cell Phone</span>
              <span style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0">{{ donor.phoneNumber }}</span>
            </div>
            <div>
              <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">Home Phone</span>
              <span style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0">{{ donor.homePhone || 'N/A' }}</span>
            </div>
            <div>
              <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">Work Phone</span>
              <span style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0">{{ donor.workPhone || 'N/A' }}</span>
            </div>
            <div>
              <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">Country / City</span>
              <span style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0">{{ getLocation() }}</span>
            </div>
            <div style="grid-column:1/-1">
              <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">Full Address</span>
              <span style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0">{{ donor.fullAddress || 'N/A' }}</span>
            </div>
            <div>
              <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">Family Status</span>
              <span *ngIf="donor.familyStatus" class="badge" style="margin-top:0.25rem"
                [class]="donor.familyStatus === 'Single' ? 'badge-emerald' :
                          donor.familyStatus === 'Married' ? 'badge-cyan' :
                          donor.familyStatus === 'Divorced' ? 'badge-amber' : 'badge-slate'">
                {{ donor.familyStatus }}
              </span>
              <span *ngIf="!donor.familyStatus" style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0">N/A</span>
            </div>
            <div>
              <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">Number of Kids</span>
              <span style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0">{{ donor.numberOfKids }}</span>
            </div>
            <div style="grid-column:1/-1" *ngIf="donor.generalNotes">
              <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">General Notes</span>
              <span style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0;white-space:pre-wrap">{{ donor.generalNotes }}</span>
            </div>
          </div>
        </div>

        <!-- Events Section -->
        <div class="glass-card" style="padding:1.5rem;order:2">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">
            <h3 style="font-size:1.0625rem;font-weight:700;color:#f1f5f9;margin:0">
              Events
              <span style="font-size:0.875rem;font-weight:400;color:#64748b;margin-left:0.5rem">({{ donor.events?.length || 0 }})</span>
            </h3>
            <button *ngIf="isAdmin" (click)="showAddEventForm()"
              style="display:inline-flex;align-items:center;gap:0.375rem;padding:0.4rem 0.875rem;font-size:0.8125rem;font-weight:600;color:white;background:linear-gradient(135deg,#8b5cf6,#6366f1);border:none;border-radius:0.5rem;cursor:pointer;box-shadow:0 4px 12px rgba(139,92,246,0.3)">
              + Add Event
            </button>
          </div>

          <!-- Empty -->
          <div *ngIf="!donor.events || donor.events.length === 0" style="text-align:center;padding:2rem 0">
            <svg style="width:2.5rem;height:2.5rem;color:#334155;margin:0 auto 0.75rem;display:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <p style="font-size:0.875rem;color:#475569;margin:0">No events recorded yet.</p>
          </div>

          <!-- Event List -->
          <div *ngIf="donor.events && donor.events.length > 0" style="display:flex;flex-direction:column;gap:0.5rem">
            <div *ngFor="let event of donor.events; let i = index"
              style="border:1px solid rgba(100,116,139,0.2);border-radius:0.625rem;overflow:hidden">

              <button (click)="toggleEvent(i)" class="accordion-header" style="width:100%;text-align:left;background:none;border:none"
                [attr.aria-expanded]="expandedEvents.has(i)">
                <div style="display:flex;align-items:center;gap:1rem;min-width:0">
                  <span class="badge badge-violet">{{ getEventTypeLabel(event.eventType) }}</span>
                  <span style="font-size:0.875rem;color:#94a3b8">{{ event.eventDate | date:'mediumDate' }}</span>
                </div>
                <svg style="width:1.25rem;height:1.25rem;color:#64748b;flex-shrink:0;transition:transform 0.2s"
                  [style.transform]="expandedEvents.has(i) ? 'rotate(180deg)' : 'rotate(0)'"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <div *ngIf="expandedEvents.has(i)" class="accordion-body">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;padding-top:0.75rem">
                  <div>
                    <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">Event Type</span>
                    <span style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0">{{ getEventTypeLabel(event.eventType) }}</span>
                  </div>
                  <div>
                    <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">Date</span>
                    <span style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0">{{ event.eventDate | date:'mediumDate' }}</span>
                  </div>
                  <div style="grid-column:1/-1">
                    <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">Notes</span>
                    <span style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0">{{ event.notes || 'No notes' }}</span>
                  </div>
                  <div *ngIf="isAdmin" style="grid-column:1/-1;display:flex;gap:0.5rem;padding-top:0.5rem">
                    <button (click)="showEditEventForm(event)" class="btn-ghost">Edit</button>
                    <button (click)="showDeleteEventDialog(event)" class="btn-ghost" style="color:#f87171;border-color:rgba(239,68,68,0.3)">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Donation History Section -->
        <div class="glass-card" style="padding:1.5rem;margin-bottom:1.25rem;order:1">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">
            <h3 style="font-size:1.0625rem;font-weight:700;color:#f1f5f9;margin:0">
              Donation History
              <span style="font-size:0.875rem;font-weight:400;color:#64748b;margin-left:0.5rem">({{ donor.donations.length }})</span>
            </h3>
            <button (click)="showAddDonationForm()"
              style="display:inline-flex;align-items:center;gap:0.375rem;padding:0.4rem 0.875rem;font-size:0.8125rem;font-weight:600;color:white;background:linear-gradient(135deg,#10b981,#06b6d4);border:none;border-radius:0.5rem;cursor:pointer;box-shadow:0 4px 12px rgba(16,185,129,0.3)">
              + Add Donation
            </button>
          </div>

          <div *ngIf="!donor.donations || donor.donations.length === 0" style="text-align:center;padding:2rem 0">
            <svg style="width:2.5rem;height:2.5rem;color:#334155;margin:0 auto 0.75rem;display:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p style="font-size:0.875rem;color:#475569;margin:0">No donations recorded yet.</p>
          </div>

          <div *ngIf="donor.donations && donor.donations.length > 0" style="display:flex;flex-direction:column;gap:0.5rem">
            <div *ngFor="let donation of donor.donations; let i = index"
              style="border:1px solid rgba(100,116,139,0.2);border-radius:0.625rem;overflow:hidden">
              <button (click)="toggleDonation(i)" class="accordion-header" style="width:100%;text-align:left;background:none;border:none"
                [attr.aria-expanded]="expandedDonations.has(i)"
                [attr.aria-controls]="'donation-panel-' + i">
                <div style="display:flex;align-items:center;gap:0.75rem;min-width:0">
                  <span style="font-weight:700;color:#34d399;white-space:nowrap">{{ donation.amount | currency }}</span>
                  <span style="font-size:0.875rem;color:#94a3b8">{{ donation.donationDate | date:'mediumDate' }}</span>
                  <span class="badge badge-slate">{{ donation.paymentMethod }}</span>
                  <span class="badge" [class]="donation.donationType === 'Annual' ? 'badge-violet' : 'badge-cyan'">
                    {{ donation.donationType === 'Annual' ? 'Annual' : 'One Time' }}
                  </span>
                </div>
                <svg style="width:1.25rem;height:1.25rem;color:#64748b;flex-shrink:0;transition:transform 0.2s"
                  [style.transform]="expandedDonations.has(i) ? 'rotate(180deg)' : 'rotate(0)'"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <div *ngIf="expandedDonations.has(i)" [id]="'donation-panel-' + i" class="accordion-body">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;padding-top:0.75rem">
                  <div>
                    <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">Amount</span>
                    <span style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0">{{ donation.amount | currency }}</span>
                  </div>
                  <div>
                    <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">Date</span>
                    <span style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0">{{ donation.donationDate | date:'mediumDate' }}</span>
                  </div>
                  <div>
                    <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">Payment Method</span>
                    <span style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0">{{ donation.paymentMethod }}</span>
                  </div>
                  <div>
                    <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">Type</span>
                    <span class="badge" style="margin-top:0.25rem"
                      [class]="donation.donationType === 'Annual' ? 'badge-violet' : 'badge-cyan'">
                      {{ donation.donationType === 'Annual' ? 'Annual' : 'One Time' }}
                    </span>
                  </div>
                  <div>
                    <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">Receipt Number</span>
                    <span style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0">{{ donation.receiptNumber || 'N/A' }}</span>
                  </div>
                  <div style="grid-column:1/-1">
                    <span style="display:block;font-size:0.7rem;font-weight:600;color:#64748b;letter-spacing:0.05em;text-transform:uppercase">Notes</span>
                    <span style="display:block;margin-top:0.25rem;font-size:0.875rem;color:#e2e8f0">{{ donation.notes || 'No notes' }}</span>
                  </div>
                  <div style="grid-column:1/-1;display:flex;flex-wrap:wrap;gap:0.5rem;padding-top:0.5rem">
                    <button (click)="downloadPdf(donation)" class="btn-ghost" style="color:#22d3ee;border-color:rgba(34,211,238,0.3)">PDF</button>
                    <button (click)="downloadDocx(donation)" class="btn-ghost" style="color:#34d399;border-color:rgba(52,211,153,0.3)">Word</button>
                    <button *ngIf="isAdmin" (click)="showEditDonation(donation)" class="btn-ghost">Edit</button>
                    <button *ngIf="isAdmin" (click)="showDeleteDonationDialog(donation)" class="btn-ghost" style="color:#f87171;border-color:rgba(239,68,68,0.3)">Delete</button>
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
