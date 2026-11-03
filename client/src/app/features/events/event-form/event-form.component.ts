import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../../core/services/event.service';
import { NotificationService } from '../../../core/services/notification.service';
import { DonorEvent, EventType, EVENT_TYPE_LABELS, CreateEventRequest, UpdateEventRequest } from '../../../models/event.model';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div
      *ngIf="visible"
      style="position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center"
      role="dialog" aria-modal="true"
      [attr.aria-label]="event ? 'Edit Event' : 'Add Event'"
    >
      <!-- Backdrop -->
      <div style="position:absolute;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px)" (click)="onClose()"></div>

      <!-- Modal -->
      <div style="position:relative;width:100%;max-width:460px;margin:1rem;background:#0f172a;border:1px solid rgba(100,116,139,0.25);border-radius:1rem;box-shadow:0 25px 60px rgba(0,0,0,0.6)">

        <!-- Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;border-bottom:1px solid rgba(100,116,139,0.15)">
          <div style="display:flex;align-items:center;gap:0.75rem">
            <div style="width:36px;height:36px;border-radius:0.5rem;background:linear-gradient(135deg,rgba(139,92,246,0.2),rgba(34,211,238,0.2));border:1px solid rgba(139,92,246,0.25);display:flex;align-items:center;justify-content:center">
              <svg style="width:1.125rem;height:1.125rem;color:#a78bfa" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <h2 style="font-size:1.0625rem;font-weight:700;color:#f1f5f9;margin:0">{{ event ? 'Edit Event' : 'Add Event' }}</h2>
          </div>
          <button (click)="onClose()" style="background:none;border:none;cursor:pointer;color:#64748b;padding:0.25rem;border-radius:0.375rem;display:flex;align-items:center" aria-label="Close">
            <svg style="width:1.25rem;height:1.25rem" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form [formGroup]="form" (ngSubmit)="onSubmit()" style="padding:1.5rem;display:flex;flex-direction:column;gap:1.25rem">

          <!-- Event Type -->
          <div>
            <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem;letter-spacing:0.05em;text-transform:uppercase">
              Event Type <span style="color:#f87171">*</span>
            </label>
            <select formControlName="eventType" class="dark-input"
              [class.error]="isFieldInvalid('eventType')" style="cursor:pointer">
              <option value="" disabled style="background:#1e293b;color:#64748b">Select event type</option>
              <option *ngFor="let type of eventTypes" [value]="type" style="background:#1e293b;color:#e2e8f0">{{ getLabel(type) }}</option>
            </select>
            <p *ngIf="isFieldInvalid('eventType')" style="margin-top:0.3rem;font-size:0.75rem;color:#f87171">Event type is required.</p>
          </div>

          <!-- Event Date -->
          <div>
            <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;margin-bottom:0.375rem;letter-spacing:0.05em;text-transform:uppercase">
              Date <span style="color:#f87171">*</span>
            </label>
            <input type="date" formControlName="eventDate" class="dark-input"
              [class.error]="isFieldInvalid('eventDate')"/>
            <p *ngIf="isFieldInvalid('eventDate')" style="margin-top:0.3rem;font-size:0.75rem;color:#f87171">Date is required.</p>
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
              <span *ngIf="!submitting">{{ event ? 'Update' : 'Add' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class EventFormComponent implements OnChanges {
  private fb = inject(FormBuilder);
  private eventService = inject(EventService);
  private notificationService = inject(NotificationService);

  @Input() visible = false;
  @Input() donorId: string = '';
  @Input() event: DonorEvent | null = null;

  @Output() saved = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  submitting = false;
  eventTypes = Object.values(EventType);

  form: FormGroup = this.fb.group({
    eventType: ['', Validators.required],
    eventDate: ['', Validators.required],
    notes: [null]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      this.resetForm();
    }
  }

  isFieldInvalid(field: string): boolean {
    const f = this.form.get(field);
    return !!(f && f.invalid && (f.dirty || f.touched));
  }

  getLabel(type: EventType): string {
    return EVENT_TYPE_LABELS[type];
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
    const { eventType, eventDate, notes } = this.form.getRawValue();

    // Ensure date is sent as a plain yyyy-MM-dd string (what DateOnly expects)
    const request: CreateEventRequest | UpdateEventRequest = {
      eventType,
      eventDate: eventDate || null,
      notes: notes || null
    };

    const op$ = this.event
      ? this.eventService.update(this.event.id, request)
      : this.eventService.create(this.donorId, request);

    op$.subscribe({
      next: () => {
        this.submitting = false;
        this.notificationService.success(this.event ? 'Event updated.' : 'Event added.');
        this.saved.emit();
        this.closed.emit();
      },
      error: (err) => {
        this.submitting = false;
        const detail = err?.error?.errors
          ? JSON.stringify(err.error.errors)
          : err?.error?.message || err?.message || `Status ${err.status}`;
        this.notificationService.error(`Failed to save event: ${detail}`);
      }
    });
  }

  private resetForm(): void {
    if (this.event) {
      this.form.patchValue({
        eventType: this.event.eventType,
        eventDate: this.event.eventDate,
        notes: this.event.notes
      });
    } else {
      this.form.reset({ eventType: '' });
    }
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.submitting = false;
  }
}
