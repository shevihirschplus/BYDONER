import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DonorService } from '../../../core/services/donor.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Donor, FamilyStatus, CreateDonorRequest, UpdateDonorRequest } from '../../../models/donor.model';
import { COUNTRIES_CITIES } from '../../../shared/data/countries-cities';

@Component({
  selector: 'app-donor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div
      *ngIf="visible"
      style="position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center"
      role="dialog" aria-modal="true"
      [attr.aria-label]="donor ? 'Edit Donor' : 'Create Donor'"
    >
      <!-- Backdrop -->
      <div style="position:absolute;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px)" (click)="onClose()"></div>

      <!-- Modal -->
      <div style="position:relative;width:100%;max-width:680px;margin:1rem;max-height:90vh;overflow-y:auto;background:#0f172a;border:1px solid rgba(100,116,139,0.25);border-radius:1rem;box-shadow:0 25px 60px rgba(0,0,0,0.6)">

        <!-- Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;border-bottom:1px solid rgba(100,116,139,0.15);position:sticky;top:0;background:#0f172a;z-index:1">
          <div style="display:flex;align-items:center;gap:0.75rem">
            <div style="width:36px;height:36px;border-radius:0.5rem;background:linear-gradient(135deg,rgba(6,182,212,0.2),rgba(99,102,241,0.2));border:1px solid rgba(34,211,238,0.2);display:flex;align-items:center;justify-content:center">
              <svg style="width:1.125rem;height:1.125rem;color:#22d3ee" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h2 style="font-size:1.0625rem;font-weight:700;color:#f1f5f9;margin:0">{{ donor ? 'Edit Donor' : 'New Donor' }}</h2>
          </div>
          <button (click)="onClose()" style="background:none;border:none;cursor:pointer;color:#64748b;padding:0.25rem;border-radius:0.375rem;display:flex;align-items:center;transition:color 0.15s" aria-label="Close">
            <svg style="width:1.25rem;height:1.25rem" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" style="padding:1.5rem;display:flex;flex-direction:column;gap:1.5rem">

          <!-- ── Section: Name ── -->
          <fieldset style="border:none;padding:0;margin:0">
            <legend style="font-size:0.7rem;font-weight:700;color:#22d3ee;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.875rem;display:flex;align-items:center;gap:0.5rem">
              <svg style="width:0.875rem;height:0.875rem" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              Personal Information
            </legend>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.875rem">
              <!-- First Name -->
              <div>
                <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem">First Name</label>
                <input type="text" formControlName="firstName" class="dark-input" placeholder="First name"/>
              </div>
              <!-- Last Name -->
              <div>
                <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem">Last Name</label>
                <input type="text" formControlName="lastName" class="dark-input" placeholder="Last name"/>
              </div>
              <!-- Full Name (required) -->
              <div style="grid-column:1/-1">
                <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem">
                  Full Name <span style="color:#f87171">*</span>
                </label>
                <input type="text" formControlName="fullName" class="dark-input"
                  [class.error]="isFieldInvalid('fullName')"
                  placeholder="Full name as it appears on receipts"/>
                <p *ngIf="isFieldInvalid('fullName')" style="margin-top:0.3rem;font-size:0.75rem;color:#f87171">Full name is required.</p>
              </div>
              <!-- Spouse Name -->
              <div style="grid-column:1/-1">
                <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem">Spouse / Partner Name</label>
                <input type="text" formControlName="spouseName" class="dark-input" placeholder="Spouse or partner name"/>
              </div>
              <!-- Birthdate -->
              <div>
                <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem">Birthdate</label>
                <input type="date" formControlName="birthdate" class="dark-input"/>
              </div>
              <!-- Family Status -->
              <div>
                <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem">
                  Family Status
                </label>
                <select formControlName="familyStatus" class="dark-input" style="cursor:pointer">
                  <option [ngValue]="null" style="background:#1e293b">Not specified</option>
                  <option *ngFor="let s of familyStatuses" [value]="s" style="background:#1e293b">{{ s }}</option>
                </select>
              </div>
              <!-- Number of Kids -->
              <div>
                <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem">
                  Number of Kids
                </label>
                <input type="number" formControlName="numberOfKids" min="0" class="dark-input"
                  [class.error]="isFieldInvalid('numberOfKids')" placeholder="0"/>
                <p *ngIf="isFieldInvalid('numberOfKids')" style="margin-top:0.3rem;font-size:0.75rem;color:#f87171">Must be 0 or greater.</p>
              </div>
            </div>
          </fieldset>

          <hr style="border:none;border-top:1px solid rgba(100,116,139,0.15);margin:0"/>

          <!-- ── Section: Contact ── -->
          <fieldset style="border:none;padding:0;margin:0">
            <legend style="font-size:0.7rem;font-weight:700;color:#34d399;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.875rem;display:flex;align-items:center;gap:0.5rem">
              <svg style="width:0.875rem;height:0.875rem" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Contact Information
            </legend>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.875rem">
              <!-- Email -->
              <div style="grid-column:1/-1">
                <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem">
                  Email <span style="color:#f87171">*</span>
                </label>
                <input type="email" formControlName="email" class="dark-input"
                  [class.error]="isFieldInvalid('email')"
                  placeholder="email@example.com"/>
                <p *ngIf="isFieldInvalid('email') && form.get('email')?.errors?.['required']" style="margin-top:0.3rem;font-size:0.75rem;color:#f87171">Email is required.</p>
                <p *ngIf="isFieldInvalid('email') && form.get('email')?.errors?.['email']" style="margin-top:0.3rem;font-size:0.75rem;color:#f87171">Please enter a valid email address.</p>
              </div>
              <!-- Cell Phone -->
              <div>
                <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem">
                  Cell Phone <span style="color:#f87171">*</span>
                </label>
                <input type="tel" formControlName="phoneNumber" class="dark-input"
                  [class.error]="isFieldInvalid('phoneNumber')"
                  placeholder="+1 555 000 0000"/>
                <p *ngIf="isFieldInvalid('phoneNumber') && form.get('phoneNumber')?.errors?.['required']" style="margin-top:0.3rem;font-size:0.75rem;color:#f87171">Cell phone is required.</p>
                <p *ngIf="isFieldInvalid('phoneNumber') && form.get('phoneNumber')?.errors?.['pattern']" style="margin-top:0.3rem;font-size:0.75rem;color:#f87171">Invalid phone format.</p>
              </div>
              <!-- Home Phone -->
              <div>
                <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem">Home Phone</label>
                <input type="tel" formControlName="homePhone" class="dark-input"
                  [class.error]="isFieldInvalid('homePhone')"
                  placeholder="Home number"/>
                <p *ngIf="isFieldInvalid('homePhone')" style="margin-top:0.3rem;font-size:0.75rem;color:#f87171">Invalid phone format.</p>
              </div>
              <!-- Work Phone -->
              <div>
                <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem">Work Phone</label>
                <input type="tel" formControlName="workPhone" class="dark-input"
                  [class.error]="isFieldInvalid('workPhone')"
                  placeholder="Work number"/>
                <p *ngIf="isFieldInvalid('workPhone')" style="margin-top:0.3rem;font-size:0.75rem;color:#f87171">Invalid phone format.</p>
              </div>
            </div>
          </fieldset>

          <hr style="border:none;border-top:1px solid rgba(100,116,139,0.15);margin:0"/>

          <!-- ── Section: Location ── -->
          <fieldset style="border:none;padding:0;margin:0">
            <legend style="font-size:0.7rem;font-weight:700;color:#a78bfa;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.875rem;display:flex;align-items:center;gap:0.5rem">
              <svg style="width:0.875rem;height:0.875rem" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Location
            </legend>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.875rem">
              <!-- Country -->
              <div>
                <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem">Country</label>
                <select formControlName="country" (change)="onCountryChange()" class="dark-input" style="cursor:pointer">
                  <option [ngValue]="null" style="background:#1e293b">Select country</option>
                  <option *ngFor="let c of countries" [value]="c" style="background:#1e293b">{{ c }}</option>
                </select>
              </div>
              <!-- City -->
              <div>
                <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem">City</label>
                <input type="text" formControlName="city" list="city-options" placeholder="Select or type a city" class="dark-input"/>
                <datalist id="city-options">
                  <option *ngFor="let city of cities" [value]="city"></option>
                </datalist>
              </div>
              <!-- Full Address -->
              <div style="grid-column:1/-1">
                <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem">Full Address</label>
                <input type="text" formControlName="fullAddress" class="dark-input" placeholder="Street address, apartment, etc."/>
              </div>
            </div>
          </fieldset>

          <!-- ── Section: Notes ── -->
          <fieldset style="border:none;padding:0;margin:0">
            <legend style="font-size:0.7rem;font-weight:700;color:#fbbf24;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.875rem;display:flex;align-items:center;gap:0.5rem">
              <svg style="width:0.875rem;height:0.875rem" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              General Notes
            </legend>
            <textarea
              formControlName="generalNotes"
              rows="4"
              class="dark-input"
              placeholder="Any general notes about this donor…"
              style="resize:vertical;min-height:90px;font-family:inherit;line-height:1.5"
            ></textarea>
          </fieldset>

          <hr style="border:none;border-top:1px solid rgba(100,116,139,0.15);margin:0"/>

          <!-- ── Actions ── -->
          <div style="display:flex;justify-content:flex-end;gap:0.75rem;padding-top:0.5rem;border-top:1px solid rgba(100,116,139,0.15)">
            <button type="button" (click)="onClose()" class="btn-secondary">Cancel</button>
            <button type="submit" class="btn-primary" [disabled]="form.invalid || submitting">
              <span *ngIf="submitting" style="display:flex;align-items:center;gap:0.375rem">
                <span style="width:0.875rem;height:0.875rem;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.7s linear infinite;display:inline-block"></span>
                Saving...
              </span>
              <span *ngIf="!submitting">{{ donor ? 'Update Donor' : 'Create Donor' }}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  `
})
export class DonorFormComponent implements OnChanges {
  private fb = inject(FormBuilder);
  private donorService = inject(DonorService);
  private notificationService = inject(NotificationService);

  @Input() visible = false;
  @Input() donor: Donor | null = null;

  @Output() saved = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  submitting = false;

  familyStatuses = Object.values(FamilyStatus);

  countries: string[] = Object.keys(COUNTRIES_CITIES).sort();
  cities: string[] = [];

  form: FormGroup = this.fb.group({
    firstName: [null],
    lastName: [null],
    fullName: ['', [Validators.required]],
    spouseName: [null],
    birthdate: [null],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9+\-() ]+$/)]],
    homePhone: [null, [Validators.pattern(/^[0-9+\-() ]+$/)]],
    workPhone: [null, [Validators.pattern(/^[0-9+\-() ]+$/)]],
    generalNotes: [null],
    country: [null],
    city: [null],
    fullAddress: [null],
    familyStatus: [null],
    numberOfKids: [null, [Validators.min(0)]]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      this.resetForm();
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onCountryChange(): void {
    const country = this.form.get('country')?.value;
    this.cities = country ? (COUNTRIES_CITIES[country] || []) : [];
    this.form.patchValue({ city: '' });
  }

  onClose(): void {
    this.closed.emit();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const formValue = this.form.getRawValue();

    const request: CreateDonorRequest | UpdateDonorRequest = {
      fullName: formValue.fullName,
      firstName: formValue.firstName || null,
      lastName: formValue.lastName || null,
      spouseName: formValue.spouseName || null,
      birthdate: formValue.birthdate || null,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber,
      homePhone: formValue.homePhone || null,
      cellPhone: formValue.phoneNumber || null,
      workPhone: formValue.workPhone || null,
      generalNotes: formValue.generalNotes || null,
      country: formValue.country || null,
      city: formValue.city || null,
      location: null,
      fullAddress: formValue.fullAddress || null,
      familyStatus: formValue.familyStatus || null,
      numberOfKids: Number(formValue.numberOfKids) || 0
    };

    const operation$ = this.donor
      ? this.donorService.update(this.donor.id, request)
      : this.donorService.create(request);

    operation$.subscribe({
      next: () => {
        this.submitting = false;
        this.notificationService.success(
          this.donor ? 'Donor updated successfully.' : 'Donor created successfully.'
        );
        this.saved.emit();
        this.closed.emit();
      },
      error: (err) => {
        this.submitting = false;
        const msg = err?.error?.error || err?.error?.errors
          ? 'Validation failed: ' + JSON.stringify(err.error.errors)
          : `Failed to save donor (${err.status}). Please try again.`;
        this.notificationService.error(msg);
      }
    });
  }

  private resetForm(): void {
    if (this.donor) {
      this.cities = this.donor.country ? (COUNTRIES_CITIES[this.donor.country] || []) : [];
      this.form.patchValue({
        firstName: this.donor.firstName,
        lastName: this.donor.lastName,
        fullName: this.donor.fullName,
        spouseName: this.donor.spouseName,
        birthdate: this.donor.birthdate,
        email: this.donor.email,
        phoneNumber: this.donor.phoneNumber,
        homePhone: this.donor.homePhone,
        workPhone: this.donor.workPhone,
        generalNotes: this.donor.generalNotes,
        country: this.donor.country,
        city: this.donor.city,
        fullAddress: this.donor.fullAddress,
        familyStatus: this.donor.familyStatus,
        numberOfKids: this.donor.numberOfKids
      });
    } else {
      this.cities = [];
      this.form.reset({ numberOfKids: null, familyStatus: null, country: null, city: null });
    }
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.submitting = false;
  }
}
