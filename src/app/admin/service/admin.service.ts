import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    const params = new HttpParams().set('Id', userId).set('RoleId', roleId);
    return this.http.post<ApiResponse<any>>(
      `${environment.apiBaseUrl}/api/Admin/AuthenticateUserForLogin`,
      { id: userId, roleId: roleId }
    );
  }
}
