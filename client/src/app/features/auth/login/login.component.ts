import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:1.5rem;background:#0f172a;position:relative;overflow:hidden">
      <!-- Background glow blobs -->
      <div style="position:absolute;top:-15%;left:-10%;width:50vw;height:50vw;background:radial-gradient(circle,rgba(34,211,238,0.08),transparent 70%);pointer-events:none"></div>
      <div style="position:absolute;bottom:-15%;right:-10%;width:45vw;height:45vw;background:radial-gradient(circle,rgba(139,92,246,0.08),transparent 70%);pointer-events:none"></div>

      <!-- Card -->
      <div style="width:100%;max-width:420px;background:rgba(15,23,42,0.9);border:1px solid rgba(100,116,139,0.2);border-radius:1rem;padding:2.5rem;backdrop-filter:blur(20px);box-shadow:0 25px 50px rgba(0,0,0,0.5);position:relative;z-index:1">

        <!-- Logo + title -->
        <div style="text-align:center;margin-bottom:2rem">
          <img src="assets/logo.jpg" alt="Logo"
            style="width:72px;height:72px;border-radius:50%;object-fit:cover;margin:0 auto 1rem;display:block;border:2px solid rgba(34,211,238,0.4);box-shadow:0 0 24px rgba(34,211,238,0.2)" />
          <h1 class="gradient-text" style="font-size:1.5rem;font-weight:800;letter-spacing:-0.02em;margin:0 0 0.25rem">
            Donor Management
          </h1>
          <p style="color:#64748b;font-size:0.875rem;margin:0">Sign in to continue</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" style="display:flex;flex-direction:column;gap:1.25rem">
          <!-- Username -->
          <div>
            <label for="username" style="display:block;font-size:0.8rem;font-weight:600;color:#94a3b8;margin-bottom:0.375rem;letter-spacing:0.05em;text-transform:uppercase">
              Username
            </label>
            <input
              id="username"
              type="text"
              formControlName="username"
              class="dark-input"
              [class.error]="loginForm.get('username')?.touched && loginForm.get('username')?.hasError('required')"
              placeholder="Enter your username"
            />
            <p *ngIf="loginForm.get('username')?.touched && loginForm.get('username')?.hasError('required')"
               style="margin-top:0.375rem;font-size:0.8rem;color:#f87171">
              Username is required
            </p>
          </div>

          <!-- Password -->
          <div>
            <label for="password" style="display:block;font-size:0.8rem;font-weight:600;color:#94a3b8;margin-bottom:0.375rem;letter-spacing:0.05em;text-transform:uppercase">
              Password
            </label>
            <div style="position:relative">
              <input
                id="password"
                [type]="showPassword ? 'text' : 'password'"
                formControlName="password"
                class="dark-input"
                [class.error]="loginForm.get('password')?.touched && loginForm.get('password')?.hasError('required')"
                placeholder="Enter your password"
                style="padding-right:2.75rem"
              />
              <button type="button" (click)="togglePassword()"
                style="position:absolute;right:0.75rem;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#64748b;padding:0;display:flex;align-items:center"
                [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'">
                <svg *ngIf="!showPassword" style="width:1.125rem;height:1.125rem" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg *ngIf="showPassword" style="width:1.125rem;height:1.125rem" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              </button>
            </div>
            <p *ngIf="loginForm.get('password')?.touched && loginForm.get('password')?.hasError('required')"
               style="margin-top:0.375rem;font-size:0.8rem;color:#f87171">
              Password is required
            </p>
          </div>

          <!-- Error banner -->
          <div *ngIf="errorMessage"
            style="padding:0.75rem 1rem;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:0.5rem;display:flex;align-items:center;gap:0.5rem">
            <svg style="width:1rem;height:1rem;color:#f87171;flex-shrink:0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p style="font-size:0.875rem;color:#f87171;margin:0">{{ errorMessage }}</p>
          </div>

          <!-- Submit -->
          <button type="submit" class="btn-primary" [disabled]="loginForm.invalid || loading"
            style="width:100%;justify-content:center;padding:0.75rem;font-size:0.9375rem;margin-top:0.25rem">
            <svg *ngIf="!loading" style="width:1rem;height:1rem" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
            </svg>
            <span *ngIf="loading" style="display:flex;align-items:center;gap:0.5rem">
              <span style="width:1rem;height:1rem;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.7s linear infinite;display:inline-block"></span>
              Signing in...
            </span>
            <span *ngIf="!loading">Sign In</span>
          </button>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  loading = false;
  errorMessage = '';
  showPassword = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const request: LoginRequest = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.authService.login(request).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 401) {
          this.errorMessage = 'Invalid username or password';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      }
    });
  }
}
