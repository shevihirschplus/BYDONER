import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Global toast container -->
    <div style="position:fixed;top:1rem;right:1rem;z-index:9999;display:flex;flex-direction:column;gap:0.5rem;max-width:22rem"
         aria-live="polite" aria-atomic="true">
      @for (notification of notifications$ | async; track notification.id) {
        <div class="toast-enter"
             [style]="getNotificationStyle(notification)"
             style="border-radius:0.75rem;padding:0.875rem 1rem;display:flex;align-items:center;gap:0.75rem;box-shadow:0 8px 32px rgba(0,0,0,0.4)"
             role="alert">
          <span style="font-size:1.125rem;flex-shrink:0">{{ getIcon(notification.type) }}</span>
          <p style="flex:1;font-size:0.875rem;font-weight:500;margin:0;line-height:1.4">{{ notification.message }}</p>
          <button
            (click)="dismiss(notification.id)"
            style="background:none;border:none;cursor:pointer;opacity:0.6;font-size:1.125rem;line-height:1;padding:0;color:inherit;flex-shrink:0"
            aria-label="Dismiss notification">
            &times;
          </button>
        </div>
      }
    </div>
  `
})
export class NotificationComponent {
  private notificationService = inject(NotificationService);
  notifications$ = this.notificationService.notifications;

  getNotificationStyle(notification: Notification): string {
    switch (notification.type) {
      case 'success':
        return 'background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.35);color:#34d399';
      case 'error':
        return 'background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.35);color:#f87171';
      case 'info':
        return 'background:rgba(34,211,238,0.12);border:1px solid rgba(34,211,238,0.3);color:#22d3ee';
      default:
        return 'background:rgba(30,41,59,0.8);border:1px solid #334155;color:#94a3b8';
    }
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'info': return 'ℹ';
      default: return '';
    }
  }

  dismiss(id: number): void {
    this.notificationService.dismiss(id);
  }
}
