import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Donor,
  CreateDonorRequest,
  UpdateDonorRequest,
  DonorSearchFilter,
  PagedResult
} from '../../models/donor.model';

@Injectable({
  providedIn: 'root'
})
export class DonorService {
  private http = inject(HttpClient);
  private baseUrl = '/api/donors';

  search(filter: DonorSearchFilter): Observable<PagedResult<Donor>> {
    let params = new HttpParams();

    if (filter.query) {
      params = params.set('query', filter.query);
    }
    if (filter.familyStatus) {
      params = params.set('familyStatus', filter.familyStatus);
    }
    if (filter.location) {
      params = params.set('location', filter.location);
    }
    if (filter.minAmount != null) {
      params = params.set('minAmount', filter.minAmount.toString());
    }
    if (filter.maxAmount != null) {
      params = params.set('maxAmount', filter.maxAmount.toString());
    }
    if (filter.fromDate) {
      params = params.set('fromDate', filter.fromDate);
    }
    if (filter.toDate) {
      params = params.set('toDate', filter.toDate);
    }
    if (filter.page != null) {
      params = params.set('page', filter.page.toString());
    }
    if (filter.pageSize != null) {
      params = params.set('pageSize', filter.pageSize.toString());
    }

    return this.http.get<PagedResult<Donor>>(this.baseUrl, { params });
  }

  getById(id: string): Observable<Donor> {
    return this.http.get<Donor>(`${this.baseUrl}/${id}`);
  }

  create(request: CreateDonorRequest): Observable<Donor> {
    return this.http.post<Donor>(this.baseUrl, request);
  }

  update(id: string, request: UpdateDonorRequest): Observable<Donor> {
    return this.http.put<Donor>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
