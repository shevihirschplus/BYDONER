import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DonationService } from '../../../core/services/donation.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Donation, PaymentMethod, DonationType, CreateDonationRequest, UpdateDonationRequest, Currency } from '../../../models/donation.model';

@Component({
  selector: 'app-donation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div
      *ngIf="visible"
      style="position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center"
      role="dialog" aria-modal="true"
      [attr.aria-label]="donation ? 'Edit Donation' : 'Create Donation'"
    >
      <!-- Backdrop -->
      <div style="position:absolute;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px)" (click)="onClose()"></div>

      <!-- Modal -->
      <div style="position:relative;width:100%;max-width:520px;margin:1rem;max-height:90vh;overflow-y:auto;background:#0f172a;border:1px solid rgba(100,116,139,0.25);border-radius:1rem;box-shadow:0 25px 60px rgba(0,0,0,0.6)">

        <!-- Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;border-bottom:1px solid rgba(100,116,139,0.15);position:sticky;top:0;background:#0f172a;z-index:1">
          <div style="display:flex;align-items:center;gap:0.75rem">
            <div style="width:36px;height:36px;border-radius:0.5rem;background:linear-gradient(135deg,rgba(52,211,153,0.2),rgba(6,182,212,0.2));border:1px solid rgba(52,211,153,0.25);display:flex;align-items:center;justify-content:center">
              <svg style="width:1.125rem;height:1.125rem;color:#34d399" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h2 style="font-size:1.0625rem;font-weight:700;color:#f1f5f9;margin:0">{{ donation ? 'Edit Donation' : 'New Donation' }}</h2>
          </div>
          <button (click)="onClose()" style="background:none;border:none;cursor:pointer;color:#64748b;padding:0.25rem;border-radius:0.375rem;display:flex;align-items:center" aria-label="Close">
            <svg style="width:1.25rem;height:1.25rem" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" style="padding:1.5rem;display:flex;flex-direction:column;gap:1.25rem">

          <!-- Donation Type Toggle -->
          <div>
            <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.625rem;letter-spacing:0.05em;text-transform:uppercase">Donation Type</label>
            <div style="display:flex;background:#1e293b;border:1px solid #334155;border-radius:0.625rem;padding:0.25rem;gap:0.25rem">
              <button
                type="button"
                (click)="setDonationType('OneTime')"
                style="flex:1;padding:0.5rem 1rem;border-radius:0.375rem;border:none;font-size:0.875rem;font-weight:600;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:0.375rem"
                [style.background]="form.get('donationType')?.value === 'OneTime' ? 'linear-gradient(135deg,#06b6d4,#6366f1)' : 'transparent'"
                [style.color]="form.get('donationType')?.value === 'OneTime' ? 'white' : '#64748b'"
                [style.box-shadow]="form.get('donationType')?.value === 'OneTime' ? '0 4px 12px rgba(6,182,212,0.3)' : 'none'"
              >
                <svg style="width:0.875rem;height:0.875rem" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                One Time
              </button>
              <button
                type="button"
                (click)="setDonationType('Annual')"
                style="flex:1;padding:0.5rem 1rem;border-radius:0.375rem;border:none;font-size:0.875rem;font-weight:600;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:0.375rem"
                [style.background]="form.get('donationType')?.value === 'Annual' ? 'linear-gradient(135deg,#8b5cf6,#06b6d4)' : 'transparent'"
                [style.color]="form.get('donationType')?.value === 'Annual' ? 'white' : '#64748b'"
                [style.box-shadow]="form.get('donationType')?.value === 'Annual' ? '0 4px 12px rgba(139,92,246,0.3)' : 'none'"
              >
                <svg style="width:0.875rem;height:0.875rem" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Annual
              </button>
            </div>
          </div>

          <!-- Amount + Currency row -->
          <div style="display:grid;grid-template-columns:1fr auto;gap:0.75rem;align-items:start">
            <div>
              <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem;letter-spacing:0.05em;text-transform:uppercase">
                Amount <span style="color:#f87171">*</span>
              </label>
              <input type="number" step="0.01" formControlName="amount" class="dark-input"
                [class.error]="isFieldInvalid('amount')" placeholder="0.00"/>
              <p *ngIf="isFieldInvalid('amount') && form.get('amount')?.errors?.['required']" style="margin-top:0.3rem;font-size:0.75rem;color:#f87171">Amount is required.</p>
              <p *ngIf="isFieldInvalid('amount') && form.get('amount')?.errors?.['min']" style="margin-top:0.3rem;font-size:0.75rem;color:#f87171">Must be greater than zero.</p>
            </div>
            <div>
              <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem;letter-spacing:0.05em;text-transform:uppercase">Currency</label>
              <select formControlName="currency" class="dark-input" style="cursor:pointer;width:110px">
                <option value="USD" style="background:#1e293b">$ USD</option>
                <option value="NIS" style="background:#1e293b">₪ NIS</option>
                <option value="GBP" style="background:#1e293b">£ GBP</option>
              </select>
            </div>
          </div>

          <!-- Date -->
          <div>
            <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem;letter-spacing:0.05em;text-transform:uppercase">
              Donation Date <span style="color:#f87171">*</span>
            </label>
            <input type="date" formControlName="donationDate" class="dark-input"
              [class.error]="isFieldInvalid('donationDate')"/>
            <p *ngIf="isFieldInvalid('donationDate')" style="margin-top:0.3rem;font-size:0.75rem;color:#f87171">Date is required.</p>
          </div>

          <!-- Payment Method -->
          <div>
            <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem;letter-spacing:0.05em;text-transform:uppercase">
              Payment Method <span style="color:#f87171">*</span>
            </label>
            <select formControlName="paymentMethod" class="dark-input"
              [class.error]="isFieldInvalid('paymentMethod')" style="cursor:pointer">
              <option value="" disabled style="background:#1e293b">Select method</option>
              <option *ngFor="let method of paymentMethods" [value]="method" style="background:#1e293b">{{ formatPaymentMethod(method) }}</option>
            </select>
            <p *ngIf="isFieldInvalid('paymentMethod')" style="margin-top:0.3rem;font-size:0.75rem;color:#f87171">Payment method is required.</p>
          </div>

          <!-- Notes -->
          <div>
            <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem;letter-spacing:0.05em;text-transform:uppercase">Notes</label>
            <textarea formControlName="notes" rows="3" class="dark-input"
              placeholder="Optional notes…"
              style="resize:vertical;font-family:inherit;line-height:1.5"></textarea>
          </div>

          <!-- Actions -->
          <div style="display:flex;justify-content:flex-end;gap:0.75rem;padding-top:0.5rem;border-top:1px solid rgba(100,116,139,0.15)">
            <button type="button" (click)="onClose()" class="btn-secondary">Cancel</button>
            <button type="submit" class="btn-primary" [disabled]="form.invalid || submitting">
              <span *ngIf="submitting" style="display:flex;align-items:center;gap:0.375rem">
                <span style="width:0.875rem;height:0.875rem;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.7s linear infinite;display:inline-block"></span>
                Saving...
              </span>
              <span *ngIf="!submitting">{{ donation ? 'Update' : 'Create' }}</span>
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
    donationType: [DonationType.OneTime, [Validators.required]],
    notes: [null]
  });

  setDonationType(type: string): void {
    this.form.patchValue({ donationType: type });
  }

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
      case PaymentMethod.Achisamach: return 'Achisamach';
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
      paymentMethod: formValue.paymentMethod,
      donationType: formValue.donationType
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
        donationType: this.donation.donationType || DonationType.OneTime,
        notes: this.donation.notes
      });
    } else {
      this.form.reset({ paymentMethod: '', currency: 'USD', donationType: DonationType.OneTime });
    }
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.submitting = false;
  }
}
