import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLoginModel } from '../../shared/Models/userLoginModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = '';

  constructor(private http: HttpClient) {}

  Login(UserLogin: UserLoginModel): Observable<any> {
    return this.http.post(this.apiUrl, UserLogin);
  }
}
