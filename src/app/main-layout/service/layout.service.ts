import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../../shared/Models/ApiResponse';
import { GetProfileModel } from '../../shared/Models/UserModel/getProfileModel';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private apiUrl = 'https://newsdata.io/api/1/news';
  private apiKey = 'pub_56227a467511f5e3e9108b40f29dae0200b83';
  constructor(private http: HttpClient) {}
  getUserProfile(UserId: any): Observable<ApiResponse<GetProfileModel>> {
    const queryParams = { UserId: UserId };
    return this.http.get<any>(
      `${environment.apiBaseUrl}/api/Users/GetUserDetails`,
      { params: queryParams }
    );
  }

  updateUserProfile(userData: any): Observable<ApiResponse<any>> {
    return this.http.post<any>(
      `${environment.apiBaseUrl}/api/Users/EditUserDetails`,
      userData
    );
  }

  // getquote(category: string): Observable<any> {
  //   const url = `https://zenquotes.io/api/quotes/`;
  //   return this.http.get<any>(url);
  // }

  getNewsData(): Observable<any> {
    const url = `${this.apiUrl}?apikey=${this.apiKey}&language=en&category=science,technology`;
    return this.http.get<any>(url);
  }

  getTeamMembersData(teamId: string): Observable<ApiResponse<any>> {
    const params = new HttpParams().set('TeamId', teamId);
    return this.http.get<ApiResponse<any>>(
      `${environment.apiBaseUrl}/api/Admin/GetTeamById`,
      { params }
    );
  }
}
