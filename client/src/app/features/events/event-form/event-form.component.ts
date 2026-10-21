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
      class="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      [attr.aria-label]="event ? 'Edit Event' : 'Add Event'"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50" (click)="onClose()"></div>

      <!-- Modal -->
      <div class="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ event ? 'Edit Event' : 'Add Event' }}
          </h2>
          <button (click)="onClose()" class="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="px-6 py-4 space-y-4">

          <!-- Event Type -->
          <div>
            <label for="eventType" class="block text-sm font-medium text-gray-700 mb-1">Event Type *</label>
            <select
              id="eventType"
              formControlName="eventType"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              [class.border-red-500]="isFieldInvalid('eventType')"
            >
              <option value="" disabled>Select event type</option>
              <option *ngFor="let type of eventTypes" [value]="type">{{ getLabel(type) }}</option>
            </select>
            <p *ngIf="isFieldInvalid('eventType')" class="mt-1 text-sm text-red-600">Event type is required.</p>
          </div>

          <!-- Event Date -->
          <div>
            <label for="eventDate" class="block text-sm font-medium text-gray-700 mb-1">Date *</label>
            <input
              id="eventDate"
              type="date"
              formControlName="eventDate"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              [class.border-red-500]="isFieldInvalid('eventDate')"
            />
            <p *ngIf="isFieldInvalid('eventDate')" class="mt-1 text-sm text-red-600">Date is required.</p>
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
              {{ submitting ? 'Saving...' : (event ? 'Update' : 'Add') }}
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
    const request: CreateEventRequest | UpdateEventRequest = { eventType, eventDate, notes: notes || null };

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
      error: () => {
        this.submitting = false;
        this.notificationService.error('Failed to save event. Please try again.');
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
