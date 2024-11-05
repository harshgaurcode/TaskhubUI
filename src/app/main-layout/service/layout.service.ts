import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private apiUrl = 'https://newsdata.io/api/1/news';
  private apiKey = 'pub_56227a467511f5e3e9108b40f29dae0200b83';
  constructor(private http: HttpClient) {}
  getUserProfile(UserId: any): Observable<any> {
    const queryParams = { UserId: UserId };
    return this.http.get<any>(
      `${environment.apiBaseUrl}/api/Users/GetUserDetails`,
      { params: queryParams }
    );
  }

  updateUserProfile(userData: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiBaseUrl}/api/Users/EditUserDetails`,
      userData
    );
  }

  getNewsData(): Observable<any> {
    const url = `${this.apiUrl}?apikey=${this.apiKey}&language=en&category=science,technology`;
    return this.http.get<any>(url);
  }
}
