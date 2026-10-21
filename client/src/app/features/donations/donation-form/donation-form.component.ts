import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DonationService } from '../../../core/services/donation.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Donation, PaymentMethod, CreateDonationRequest, UpdateDonationRequest, Currency } from '../../../models/donation.model';

@Component({
  selector: 'app-donation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <!-- Modal Overlay -->
    <div
      *ngIf="visible"
      class="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      [attr.aria-label]="donation ? 'Edit Donation' : 'Create Donation'"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/50"
        (click)="onClose()"
      ></div>

      <!-- Modal Content -->
      <div class="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ donation ? 'Edit Donation' : 'Create Donation' }}
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
          <!-- Amount -->
          <div>
            <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
            <input
              id="amount"
              type="number"
              step="0.01"
              formControlName="amount"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              [class.border-red-500]="isFieldInvalid('amount')"
            />
            <p *ngIf="isFieldInvalid('amount') && form.get('amount')?.errors?.['required']" class="mt-1 text-sm text-red-600">
              Amount is required.
            </p>
            <p *ngIf="isFieldInvalid('amount') && form.get('amount')?.errors?.['min']" class="mt-1 text-sm text-red-600">
              Amount must be greater than zero.
            </p>
          </div>

          <!-- Currency -->
          <div>
            <label for="currency" class="block text-sm font-medium text-gray-700 mb-1">Currency *</label>
            <select
              id="currency"
              formControlName="currency"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="USD">$ Dollar (USD)</option>
              <option value="NIS">₪ Shekel (NIS)</option>
            </select>
          </div>

          <!-- Donation Date -->
          <div>
            <label for="donationDate" class="block text-sm font-medium text-gray-700 mb-1">Donation Date *</label>
            <input
              id="donationDate"
              type="date"
              formControlName="donationDate"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              [class.border-red-500]="isFieldInvalid('donationDate')"
            />
            <p *ngIf="isFieldInvalid('donationDate')" class="mt-1 text-sm text-red-600">
              Donation date is required.
            </p>
          </div>

          <!-- Payment Method -->
          <div>
            <label for="paymentMethod" class="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label>
            <select
              id="paymentMethod"
              formControlName="paymentMethod"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              [class.border-red-500]="isFieldInvalid('paymentMethod')"
            >
              <option value="" disabled>Select payment method</option>
              <option *ngFor="let method of paymentMethods" [value]="method">{{ formatPaymentMethod(method) }}</option>
            </select>
            <p *ngIf="isFieldInvalid('paymentMethod')" class="mt-1 text-sm text-red-600">
              Payment method is required.
            </p>
          </div>

          <!-- Notes -->
          <div>
            <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              id="notes"
              formControlName="notes"
              rows="3"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
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
              {{ submitting ? 'Saving...' : (donation ? 'Update' : 'Create') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class DonationFormComponent implements OnChanges {
  private fb = inject(FormBuilder);
  private donationService = inject(DonationService);
  private notificationService = inject(NotificationService);

  @Input() visible = false;
  @Input() donorId: string = '';
  @Input() donation: Donation | null = null;

  @Output() saved = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  submitting = false;

  paymentMethods = Object.values(PaymentMethod);

  form: FormGroup = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0.01)]],
    currency: ['USD', [Validators.required]],
    donationDate: ['', [Validators.required]],
    paymentMethod: ['', [Validators.required]],
    notes: [null]
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

  formatPaymentMethod(method: PaymentMethod): string {
    switch (method) {
      case PaymentMethod.Cash: return 'Cash';
      case PaymentMethod.CreditCard: return 'Credit Card';
      case PaymentMethod.BankTransfer: return 'Bank Transfer';
      case PaymentMethod.Check: return 'Check';
      case PaymentMethod.NedarimPlus: return 'Nedarim Plus';
      case PaymentMethod.Other: return 'Other';
      default: return method;
    }
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

    const request: CreateDonationRequest | UpdateDonationRequest = {
      amount: formValue.amount,
      currency: formValue.currency,
      donationDate: formValue.donationDate,
      notes: formValue.notes || null,
      paymentMethod: formValue.paymentMethod
    };

    const operation$ = this.donation
      ? this.donationService.update(this.donation.id, request)
      : this.donationService.create(this.donorId, request);

    operation$.subscribe({
      next: () => {
        this.submitting = false;
        this.notificationService.success(
          this.donation ? 'Donation updated successfully.' : 'Donation created successfully.'
        );
        this.saved.emit();
        this.closed.emit();
      },
      error: () => {
        this.submitting = false;
        this.notificationService.error('Failed to save donation. Please try again.');
      }
    });
  }

  private resetForm(): void {
    if (this.donation) {
      this.form.patchValue({
        amount: this.donation.amount,
        currency: this.donation.currency || 'USD',
        donationDate: this.donation.donationDate,
        paymentMethod: this.donation.paymentMethod,
        notes: this.donation.notes
      });
    } else {
      this.form.reset({ paymentMethod: '', currency: 'USD' });
    }
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.submitting = false;
  }
}
