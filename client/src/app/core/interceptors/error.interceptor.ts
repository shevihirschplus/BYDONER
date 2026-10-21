import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const notificationService = inject(NotificationService);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError(error => {
      switch (error.status) {
        case 401:
          authService.logout();
          router.navigate(['/login']);
          notificationService.error('Session expired. Please log in again.');
          break;
        case 403:
          notificationService.error('Access denied. You do not have permission to perform this action.');
          break;
        case 500:
          notificationService.error('Something went wrong. Please try again later.');
          break;
        // 400 errors are passed through for form handling
      }

      return throwError(() => error);
    })
  );
};
