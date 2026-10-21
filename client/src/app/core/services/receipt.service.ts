import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  private http = inject(HttpClient);
  private baseUrl = '/api';

  downloadPdf(donationId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/donations/${donationId}/receipt/pdf`, {
      responseType: 'blob'
    });
  }

  downloadDocx(donationId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/donations/${donationId}/receipt/docx`, {
      responseType: 'blob'
    });
  }
}
