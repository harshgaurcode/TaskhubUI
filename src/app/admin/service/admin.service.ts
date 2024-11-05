import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserLoginModel } from '../../shared/Models/userLoginModel';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../../shared/Models/ApiResponse';
import { AuthResult } from '../../shared/Models/AuthResponse';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient, private router: Router) {}

  adminLogin(userLoign: UserLoginModel): Observable<ApiResponse<AuthResult>> {
    return this.http.post<ApiResponse<any>>(
      `${environment.apiBaseUrl}/api/Auth/Login`,
      userLoign
    );
  }

  getPendingRequests(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${environment.apiBaseUrl}/api/Admin/AuthecticationRequestList`
    );
  }

  getRole(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${environment.apiBaseUrl}/api/Admin/UserRole`
    );
  }

  approveRequest(userId: string, roleId: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${environment.apiBaseUrl}api/AuthenticateUserForLogin?Id=${userId}&RoleId=${roleId},`,
      {}
    );
  }
}
