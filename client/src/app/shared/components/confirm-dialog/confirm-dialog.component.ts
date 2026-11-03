import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible) {
      <div class="modal-overlay" (click)="onCancel()" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
        <div style="background:#0f172a;border:1px solid rgba(100,116,139,0.25);border-radius:0.875rem;padding:1.75rem;max-width:420px;width:100%;margin:1rem;box-shadow:0 25px 50px rgba(0,0,0,0.6)"
             (click)="$event.stopPropagation()">
          <!-- Icon + Title -->
          <div style="display:flex;align-items:center;gap:0.875rem;margin-bottom:1rem">
            <div style="width:44px;height:44px;border-radius:50%;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.25);display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <svg style="width:1.25rem;height:1.25rem;color:#f87171" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
            <h2 id="confirm-dialog-title" style="font-size:1.0625rem;font-weight:700;color:#f1f5f9;margin:0">{{ title }}</h2>
          </div>
          <p style="color:#94a3b8;font-size:0.875rem;line-height:1.6;margin:0 0 1.5rem">{{ message }}</p>
          <div style="display:flex;justify-content:flex-end;gap:0.75rem">
            <button (click)="onCancel()" class="btn-secondary" type="button">Cancel</button>
            <button (click)="onConfirm()" class="btn-danger" type="button">{{ confirmText }}</button>
          </div>
        </div>
      </div>
    }
  `
})
export class ConfirmDialogComponent {
  @Input() visible = false;
  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to proceed?';
  @Input() confirmText = 'Confirm';

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmed.emit();
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
