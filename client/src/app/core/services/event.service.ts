import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DonorEvent, CreateEventRequest, UpdateEventRequest } from '../../models/event.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  private http = inject(HttpClient);
  private baseUrl = '/api';

  getByDonorId(donorId: string): Observable<DonorEvent[]> {
    return this.http.get<DonorEvent[]>(`${this.baseUrl}/donors/${donorId}/events`);
  }

  create(donorId: string, request: CreateEventRequest): Observable<DonorEvent> {
    return this.http.post<DonorEvent>(`${this.baseUrl}/donors/${donorId}/events`, request);
  }

  update(id: string, request: UpdateEventRequest): Observable<DonorEvent> {
    return this.http.put<DonorEvent>(`${this.baseUrl}/events/${id}`, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/events/${id}`);
  }
}
