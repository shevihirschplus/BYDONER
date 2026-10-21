import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);
  private nextId = 0;

  get notifications() {
    return this.notifications$.asObservable();
  }

  success(message: string, duration = 3000): void {
    this.addNotification(message, 'success', duration);
  }

  error(message: string, duration = 5000): void {
    this.addNotification(message, 'error', duration);
  }

  info(message: string, duration = 3000): void {
    this.addNotification(message, 'info', duration);
  }

  dismiss(id: number): void {
    const current = this.notifications$.value;
    this.notifications$.next(current.filter(n => n.id !== id));
  }

  private addNotification(message: string, type: Notification['type'], duration: number): void {
    const id = this.nextId++;
    const notification: Notification = { id, message, type, duration };
    const current = this.notifications$.value;
    this.notifications$.next([...current, notification]);

    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
  }
}
