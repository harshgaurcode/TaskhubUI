import { Component, OnInit } from '@angular/core';
import { UserLoginModel } from '../../shared/Models/userLoginModel';
import { AuthService } from '../service/auth.service';
import { ApiResponse } from '../../shared/Models/ApiResponse';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthResult } from '../../shared/Models/AuthResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isPopupVisible = false;
  constructor(private authservice: AuthService, private router: Router) {}

  LoginCred: UserLoginModel = new UserLoginModel();
  popupDisplay: Subject<boolean> = new Subject<boolean>();
  onLogin() {
    this.authservice.Login(this.LoginCred).subscribe(
      (response: ApiResponse<AuthResult>) => {
        if (response.isSuccess) {
          console.log('Login Successfull', response.result);
          localStorage.setItem('Token', response.result.token);
          localStorage.setItem('User', response.result.user.userName);
          this.router.navigateByUrl('main');
        } else {
          console.log('Login Failed');
        }
      },
      (error) => {
        console.log('An Error occurred', error);
      }
    );
  }
}
