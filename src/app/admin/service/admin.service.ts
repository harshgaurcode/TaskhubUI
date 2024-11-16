import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserLoginModel } from '../../shared/Models/userLoginModel';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../../shared/Models/ApiResponse';
import { AuthResult } from '../../shared/Models/AuthResponse';
import { TeamModel } from '../../shared/Models/Admin/teamModel';
import { ListModel } from '../../shared/Models/Admin/TeamData/listModel';
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
  deleteUser(userId: string): Observable<ApiResponse<any>> {
    const param = new HttpParams().set('UserId', userId);
    console.log(userId);
    return this.http.post<ApiResponse<any>>(
      `${environment.apiBaseUrl}/api/Admin/DeleteUser`,
      { param }
    );
  }

  approveRequest(userId: string, roleId: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${environment.apiBaseUrl}/api/Admin/AuthenticateUserForLogin`,
      { id: userId, roleId: roleId }
    );
  }

  getTeam(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${environment.apiBaseUrl}/api/Admin/GetAllTeam`
    );
  }

  getTeamMembersData(teamId: string): Observable<ApiResponse<any>> {
    const params = new HttpParams().set('TeamId', teamId);
    return this.http.get<ApiResponse<any>>(
      `${environment.apiBaseUrl}/api/Admin/GetTeamById`,
      { params }
    );
  }

  getAllUsers(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${environment.apiBaseUrl}/api/Admin/GetAllMembers`
    );
  }

  // addTeam(): Observable<ApiResponse<any>>{
  //   return this.http.get<ApiResponse<any>>(
  //     `${environment.apiBaseUrl}/api/Admin/GetUnListedEmployees'
  //   )
  // }

  getUnlistedEmployees(): Observable<ApiResponse<ListModel>> {
    return this.http.get<ApiResponse<any>>(
      `${environment.apiBaseUrl}/api/Admin/GetUnListedEmployees`
    );
  }
}
