import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NotificationComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50">
      <!-- Navigation Bar -->
      @if (authService.isAuthenticated()) {
        <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-14 sm:h-16">
              <!-- Left: User Info & Logout -->
              <div class="hidden md:flex items-center gap-3">
                <span class="text-sm text-gray-600">
                  {{ authService.getRole() }}
                </span>
                <button
                  (click)="logout()"
                  class="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                  Logout
                </button>
              </div>

              <!-- Center: Navigation -->
              <nav class="hidden md:flex items-center gap-1" aria-label="Main navigation">
                <a routerLink="/dashboard"
                   routerLinkActive="bg-indigo-50 text-indigo-700"
                   class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                  Dashboard
                </a>
                <a routerLink="/donors"
                   routerLinkActive="bg-indigo-50 text-indigo-700"
                   class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                  Donors
                </a>
              </nav>

              <!-- Right: Logo / App Name -->
              <div class="flex items-center gap-3">
                <span class="text-lg sm:text-xl font-bold text-indigo-600 truncate">
                  מערכת לניהול תורמים
                </span>
                <img src="assets/logo.jpg" alt="Logo" class="h-14 w-14 rounded-full object-cover" />
              </div>

              <!-- Mobile Hamburger Button -->
              <button
                (click)="toggleMobileMenu()"
                class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                [attr.aria-expanded]="mobileMenuOpen"
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  @if (!mobileMenuOpen) {
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 6h16M4 12h16M4 18h16" />
                  } @else {
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M6 18L18 6M6 6l12 12" />
                  }
                </svg>
              </button>
            </div>
          </div>

          <!-- Mobile Menu -->
          @if (mobileMenuOpen) {
            <nav id="mobile-menu"
                 class="md:hidden border-t border-gray-200 bg-white"
                 aria-label="Mobile navigation">
              <div class="px-4 py-3 space-y-1">
                <a routerLink="/dashboard"
                   routerLinkActive="bg-indigo-50 text-indigo-700"
                   (click)="closeMobileMenu()"
                   class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                  Dashboard
                </a>
                <a routerLink="/donors"
                   routerLinkActive="bg-indigo-50 text-indigo-700"
                   (click)="closeMobileMenu()"
                   class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                  Donors
                </a>
              </div>
              <div class="border-t border-gray-200 px-4 py-3 flex items-center justify-between">
                <span class="text-sm text-gray-600">
                  {{ authService.getRole() }}
                </span>
                <button
                  (click)="logout()"
                  class="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                  Logout
                </button>
              </div>
            </nav>
          }
        </header>
      }

      <!-- Main Content Area -->
      <main class="flex-1">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <router-outlet></router-outlet>
        </div>
      </main>

      <!-- Global Notifications -->
      <app-notification></app-notification>
    </div>
  `
})
export class AppComponent {
  title = 'Donor Management';
  mobileMenuOpen = false;

  authService = inject(AuthService);

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.mobileMenuOpen = false;
    window.location.href = '/login';
  }
}
