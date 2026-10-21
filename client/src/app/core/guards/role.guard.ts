import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

export function roleGuard(requiredRole: string): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const notificationService = inject(NotificationService);

    const userRole = authService.getRole();

    if (userRole === requiredRole) {
      return true;
    }

    notificationService.error('Access denied. You do not have the required permissions.');
    router.navigate(['/dashboard']);
    return false;
  };
}
