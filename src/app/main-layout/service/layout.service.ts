import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private http: HttpClient) {}
  getUserProfile(UserId: any): Observable<any> {
    const queryParams = { UserId: UserId };
    return this.http.get<any>(
      `${environment.apiBaseUrl}/api/Users/GetUserDetails`,
      { params: queryParams }
    );
  }
}
