import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Donation,
  CreateDonationRequest,
  UpdateDonationRequest
} from '../../models/donation.model';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private http = inject(HttpClient);
  private baseUrl = '/api';

  getByDonorId(donorId: string): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${this.baseUrl}/donors/${donorId}/donations`);
  }

  create(donorId: string, request: CreateDonationRequest): Observable<Donation> {
    return this.http.post<Donation>(`${this.baseUrl}/donors/${donorId}/donations`, request);
  }

  update(id: string, request: UpdateDonationRequest): Observable<Donation> {
    return this.http.put<Donation>(`${this.baseUrl}/donations/${id}`, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/donations/${id}`);
  }
}
