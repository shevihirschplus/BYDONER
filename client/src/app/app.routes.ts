import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'donors',
    loadComponent: () =>
      import('./features/donors/donor-list/donor-list.component').then(m => m.DonorListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'donors/:id',
    loadComponent: () =>
      import('./features/donors/donor-card/donor-card.component').then(m => m.DonorCardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'donations',
    loadComponent: () =>
      import('./features/donations/donation-list/donation-list.component').then(m => m.DonationListComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
