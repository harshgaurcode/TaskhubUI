import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLoginModel } from '../../shared/Models/userLoginModel';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../../shared/Models/ApiResponse';
import { AuthResult } from '../../shared/Models/AuthResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:7054/api/Auth/Register';

  constructor(private http: HttpClient, private router: Router) {}

  Login(UserLogin: UserLoginModel): Observable<ApiResponse<AuthResult>> {
    return this.http.post<ApiResponse<any>>(
      `${environment.apiBaseUrl}/api/Auth/Login`,
      UserLogin
    );
  }

  Register(userRegisterModel: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${environment.apiBaseUrl}/api/Auth/Register`,
      userRegisterModel
    );
  }

  sendExpectionMail(expection: any, url: any): Observable<ApiResponse<any>> {
    const body = {
      toEmail: 'harshgaur724@gmail.com',
      subject: `Expection In Api ${url}`,
      body: expection.toString(),
    };
    return this.http.post<ApiResponse<any>>(
      `${environment.apiBaseUrl}/api/Email/SendMail`,
      body
    );
  }
}
