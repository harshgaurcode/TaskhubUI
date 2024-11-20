import { Component, OnInit } from '@angular/core';
import { UserLoginModel } from '../../shared/Models/userLoginModel';
import { AuthService } from '../service/auth.service';
import { ApiResponse } from '../../shared/Models/ApiResponse';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthResult } from '../../shared/Models/AuthResponse';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { TokenService } from '../../shared/services/token.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  isSubmitting: boolean = false;
  constructor(
    private authservice: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private spinnerService: SpinnerService
  ) {}
  ngOnInit(): void {
    localStorage.clear();
  }

  LoginCred: UserLoginModel = new UserLoginModel();

  onLogin() {
    this.spinnerService.show();
    this.authservice
      .Login(this.LoginCred)
      .subscribe((response: ApiResponse<AuthResult>) => {
        this.isSubmitting = true;
        if (response.statusCode === 200) {
          this.isSubmitting = false;
          this.spinnerService.hide();
          this.tokenService.setTokenData(response.result.token);
          localStorage.setItem('Token', response.result.token);
          localStorage.setItem('User', response.result.user.userName);
          localStorage.setItem('TeamId', response.result.user.teamId);

          setTimeout(() => {
            this.router.navigateByUrl('main');
          }, 3000);
        }
      });
  }
}
