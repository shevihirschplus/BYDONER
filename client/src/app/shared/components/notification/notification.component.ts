import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm"
         aria-live="polite"
         aria-atomic="true">
      @for (notification of notifications$ | async; track notification.id) {
        <div class="toast-enter rounded-lg shadow-lg p-4 flex items-start gap-3"
             [class]="getNotificationClasses(notification)"
             role="alert">
          <span class="text-lg">{{ getIcon(notification.type) }}</span>
          <p class="flex-1 text-sm font-medium">{{ notification.message }}</p>
          <button
            (click)="dismiss(notification.id)"
            class="text-current opacity-70 hover:opacity-100 text-lg leading-none"
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

  getNotificationClasses(notification: Notification): string {
    switch (notification.type) {
      case 'success':
        return 'bg-green-50 text-green-800 border border-green-200';
      case 'error':
        return 'bg-red-50 text-red-800 border border-red-200';
      case 'info':
        return 'bg-blue-50 text-blue-800 border border-blue-200';
      default:
        return 'bg-gray-50 text-gray-800 border border-gray-200';
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
