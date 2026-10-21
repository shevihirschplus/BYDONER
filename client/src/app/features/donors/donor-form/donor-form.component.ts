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
    <!-- Modal Overlay -->
    <div
      *ngIf="visible"
      class="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      [attr.aria-label]="donor ? 'Edit Donor' : 'Create Donor'"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/50"
        (click)="onClose()"
      ></div>

      <!-- Modal Content -->
      <div class="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ donor ? 'Edit Donor' : 'Create Donor' }}
          </h2>
          <button
            (click)="onClose()"
            class="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="px-6 py-4 space-y-4">
          <!-- Full Name -->
          <div>
            <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              id="fullName"
              type="text"
              formControlName="fullName"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              [class.border-red-500]="isFieldInvalid('fullName')"
            />
            <p *ngIf="isFieldInvalid('fullName')" class="mt-1 text-sm text-red-600">
              Full name is required.
            </p>
          </div>

          <!-- Birthdate -->
          <div>
            <label for="birthdate" class="block text-sm font-medium text-gray-700 mb-1">Birthdate</label>
            <input
              id="birthdate"
              type="date"
              formControlName="birthdate"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              id="email"
              type="email"
              formControlName="email"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              [class.border-red-500]="isFieldInvalid('email')"
            />
            <p *ngIf="isFieldInvalid('email') && form.get('email')?.errors?.['required']" class="mt-1 text-sm text-red-600">
              Email is required.
            </p>
            <p *ngIf="isFieldInvalid('email') && form.get('email')?.errors?.['email']" class="mt-1 text-sm text-red-600">
              Please enter a valid email address.
            </p>
          </div>

          <!-- Phone Number -->
          <div>
            <label for="phoneNumber" class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              id="phoneNumber"
              type="tel"
              formControlName="phoneNumber"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              [class.border-red-500]="isFieldInvalid('phoneNumber')"
            />
            <p *ngIf="isFieldInvalid('phoneNumber') && form.get('phoneNumber')?.errors?.['required']" class="mt-1 text-sm text-red-600">
              Phone number is required.
            </p>
            <p *ngIf="isFieldInvalid('phoneNumber') && form.get('phoneNumber')?.errors?.['pattern']" class="mt-1 text-sm text-red-600">
              Phone number can only contain digits, plus, hyphens, parentheses, and spaces.
            </p>
          </div>

          <!-- Country and City row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="country" class="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select
                id="country"
                formControlName="country"
                (change)="onCountryChange()"
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option [ngValue]="null">Select country</option>
                <option *ngFor="let c of countries" [value]="c">{{ c }}</option>
              </select>
            </div>
            <div>
              <label for="city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                id="city"
                type="text"
                formControlName="city"
                list="city-options"
                placeholder="Select or type a city"
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <datalist id="city-options">
                <option *ngFor="let city of cities" [value]="city"></option>
              </datalist>
            </div>
          </div>

          <!-- Full Address -->
          <div>
            <label for="fullAddress" class="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
            <input
              id="fullAddress"
              type="text"
              formControlName="fullAddress"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Family Status and Number of Kids row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="familyStatus" class="block text-sm font-medium text-gray-700 mb-1">Family Status *</label>
              <select
                id="familyStatus"
                formControlName="familyStatus"
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                [class.border-red-500]="isFieldInvalid('familyStatus')"
              >
                <option value="" disabled>Select status</option>
                <option *ngFor="let status of familyStatuses" [value]="status">{{ status }}</option>
              </select>
              <p *ngIf="isFieldInvalid('familyStatus')" class="mt-1 text-sm text-red-600">
                Family status is required.
              </p>
            </div>
            <div>
              <label for="numberOfKids" class="block text-sm font-medium text-gray-700 mb-1">Number of Kids *</label>
              <input
                id="numberOfKids"
                type="number"
                formControlName="numberOfKids"
                min="0"
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                [class.border-red-500]="isFieldInvalid('numberOfKids')"
              />
              <p *ngIf="isFieldInvalid('numberOfKids') && form.get('numberOfKids')?.errors?.['required']" class="mt-1 text-sm text-red-600">
                Number of kids is required.
              </p>
              <p *ngIf="isFieldInvalid('numberOfKids') && form.get('numberOfKids')?.errors?.['min']" class="mt-1 text-sm text-red-600">
                Number of kids must be 0 or greater.
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              (click)="onClose()"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="form.invalid || submitting"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ submitting ? 'Saving...' : (donor ? 'Update' : 'Create') }}
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
    fullName: ['', [Validators.required]],
    birthdate: [null],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9+\-() ]+$/)]],
    country: [null],
    city: [null],
    fullAddress: [null],
    familyStatus: ['', [Validators.required]],
    numberOfKids: [0, [Validators.required, Validators.min(0)]]
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
      birthdate: formValue.birthdate || null,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber,
      country: formValue.country || null,
      city: formValue.city || null,
      location: null,
      fullAddress: formValue.fullAddress || null,
      familyStatus: formValue.familyStatus,
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
        fullName: this.donor.fullName,
        birthdate: this.donor.birthdate,
        email: this.donor.email,
        phoneNumber: this.donor.phoneNumber,
        country: this.donor.country,
        city: this.donor.city,
        fullAddress: this.donor.fullAddress,
        familyStatus: this.donor.familyStatus,
        numberOfKids: this.donor.numberOfKids
      });
    } else {
      this.cities = [];
      this.form.reset({ numberOfKids: 0, familyStatus: '', country: null, city: null });
    }
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.submitting = false;
  }
}
