import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// Import tap operator along with others
import { Observable, catchError, throwError, tap } from 'rxjs'; // Add tap here

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Make sure port matches backend (8081)
  private baseUrl = 'http://localhost:8081/api';

  // Add httpOptions here - inside the class
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
    withCredentials: false, // Set to false for CORS
  };

  constructor(private http: HttpClient) {
    console.log('API Service initialized with baseUrl:', this.baseUrl);
  }

  // Get all donors - with tap operator
  getDonors(): Observable<any> {
    console.log('Fetching donors from:', `${this.baseUrl}/donors`);
    return this.http.get(`${this.baseUrl}/donors`, this.httpOptions).pipe(
      tap({
        next: (data) => {
          console.log('✅ API Response - Donors:', data);
          console.log('Response type:', typeof data);
          console.log('Is array?', Array.isArray(data));
          if (Array.isArray(data)) {
            console.log('Number of donors:', data.length);
          }
        },
        error: (err) => {
          console.error('❌ API Error in tap:', err);
        },
      }),
      catchError(this.handleError),
    );
  }

  // Add new donor - with tap
  addDonor(data: any): Observable<any> {
    console.log('Adding donor:', data);
    console.log('POST to:', `${this.baseUrl}/donors`);
    return this.http.post(`${this.baseUrl}/donors`, data, this.httpOptions).pipe(
      tap({
        next: (response) => {
          console.log('✅ Donor added successfully:', response);
        },
        error: (err) => {
          console.error('❌ Error adding donor:', err);
        },
      }),
      catchError(this.handleError),
    );
  }

  // Request blood - with tap
  requestBlood(data: any): Observable<any> {
    console.log('Requesting blood:', data);
    return this.http.post(`${this.baseUrl}/requests`, data, this.httpOptions).pipe(
      tap({
        next: (response) => {
          console.log('✅ Blood request sent:', response);
        },
        error: (err) => {
          console.error('❌ Error in blood request:', err);
        },
      }),
      catchError(this.handleError),
    );
  }

  // Delete donor - with tap
  deleteDonor(id: string): Observable<any> {
    console.log('Deleting donor with id:', id);
    return this.http.delete(`${this.baseUrl}/donors/${id}`, this.httpOptions).pipe(
      tap({
        next: () => {
          console.log('✅ Donor deleted successfully:', id);
        },
        error: (err) => {
          console.error('❌ Error deleting donor:', err);
        },
      }),
      catchError(this.handleError),
    );
  }

  // Error handler
  private handleError(error: HttpErrorResponse) {
    console.error('========== API ERROR DETAILS ==========');
    console.error('Status:', error.status);
    console.error('Status Text:', error.statusText);
    console.error('Message:', error.message);
    console.error('Error:', error.error);
    console.error('URL:', error.url);
    console.error('=======================================');

    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

      if (error.status === 0) {
        errorMessage = 'Cannot connect to backend. Make sure backend is running on port 8081';
      } else if (error.status === 404) {
        errorMessage = 'API endpoint not found. Check backend routes';
      } else if (error.status === 500) {
        errorMessage = 'Backend server error. Check backend logs';
      }
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
