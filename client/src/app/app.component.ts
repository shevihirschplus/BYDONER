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
    <div class="min-h-screen flex flex-col" style="background:#0f172a">
      <!-- Navigation Bar -->
      @if (authService.isAuthenticated()) {
        <header style="
          background: rgba(15,23,42,0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(100,116,139,0.15);
          position: sticky; top: 0; z-index: 40;
        ">
          <div style="max-width:88rem;margin:0 auto;padding:0 1.25rem">
            <div style="display:flex;align-items:center;justify-content:space-between;height:64px">

              <!-- Right: Logo / App Name -->
              <div style="display:flex;align-items:center;gap:0.75rem;flex-shrink:0">
                <img src="assets/logo.jpg" alt="Logo"
                  style="height:42px;width:42px;border-radius:50%;object-fit:cover;border:2px solid rgba(34,211,238,0.3);box-shadow:0 0 12px rgba(34,211,238,0.2)" />
                <span class="gradient-text" style="font-size:1.125rem;font-weight:800;white-space:nowrap;letter-spacing:-0.02em">
                  מערכת לניהול תורמים
                </span>
              </div>

              <!-- Center: Navigation (desktop) -->
              <nav class="hidden md:flex" style="align-items:center;gap:0.25rem" aria-label="Main navigation">
                <a routerLink="/dashboard"
                   routerLinkActive="active"
                   class="nav-link">
                  <svg style="width:1rem;height:1rem;display:inline;margin-right:0.375rem" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                  Dashboard
                </a>
                <a routerLink="/donors"
                   routerLinkActive="active"
                   class="nav-link">
                  <svg style="width:1rem;height:1rem;display:inline;margin-right:0.375rem" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Donors
                </a>
              </nav>

              <!-- Left: Role badge + Logout (desktop) -->
              <div class="hidden md:flex" style="align-items:center;gap:0.75rem">
                <span class="badge badge-slate" style="font-size:0.7rem">
                  {{ authService.getRole() }}
                </span>
                <button (click)="logout()" class="btn-secondary" style="padding:0.375rem 0.875rem;font-size:0.8rem">
                  <svg style="width:0.875rem;height:0.875rem" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                  Logout
                </button>
              </div>

              <!-- Mobile hamburger -->
              <button
                (click)="toggleMobileMenu()"
                class="md:hidden"
                style="display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:0.5rem;border:1px solid #334155;background:transparent;color:#94a3b8;cursor:pointer;transition:all 0.15s"
                [attr.aria-expanded]="mobileMenuOpen"
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu">
                <svg style="width:1.25rem;height:1.25rem" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  @if (!mobileMenuOpen) {
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  } @else {
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  }
                </svg>
              </button>
            </div>
          </div>

          <!-- Mobile Menu -->
          @if (mobileMenuOpen) {
            <nav id="mobile-menu"
                 style="border-top:1px solid rgba(100,116,139,0.15);padding:0.75rem 1.25rem 1rem"
                 aria-label="Mobile navigation">
              <div style="display:flex;flex-direction:column;gap:0.25rem;margin-bottom:0.75rem">
                <a routerLink="/dashboard"
                   routerLinkActive="active"
                   (click)="closeMobileMenu()"
                   class="nav-link" style="display:block">
                  Dashboard
                </a>
                <a routerLink="/donors"
                   routerLinkActive="active"
                   (click)="closeMobileMenu()"
                   class="nav-link" style="display:block">
                  Donors
                </a>
              </div>
              <div style="border-top:1px solid #1e293b;padding-top:0.75rem;display:flex;align-items:center;justify-content:space-between">
                <span class="badge badge-slate">{{ authService.getRole() }}</span>
                <button (click)="logout()" class="btn-secondary" style="padding:0.35rem 0.75rem;font-size:0.8rem">Logout</button>
              </div>
            </nav>
          }
        </header>
      }

      <!-- Main Content Area -->
      <main style="flex:1;padding:1.5rem 1.25rem">
        <div style="max-width:88rem;margin:0 auto">
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
