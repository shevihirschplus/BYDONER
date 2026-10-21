import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donation-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Donations</h1>
      <p class="text-gray-500">Donation list component - to be implemented</p>
    </div>
  `
})
export class DonationListComponent {}
