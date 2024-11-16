import { Component } from '@angular/core';
import { AuthService } from '../../../Auth/service/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { UserLoginModel } from '../../../shared/Models/userLoginModel';
import { AuthResult } from '../../../shared/Models/AuthResponse';
import { ApiResponse } from '../../../shared/Models/ApiResponse';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  isSubmitting: boolean = false;
  constructor(
    private authservice: AuthService,
    private router: Router,
    private snackbarService: SnackbarService,
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
          this.snackbarService.showsuccess('Login was successful!', 'Success');
          console.log('Login Successfull', response.result);
          localStorage.setItem('Token', response.result.token);
          localStorage.setItem('User', response.result.user.userName);
          setTimeout(() => {
            this.router.navigateByUrl('admin/dash');
          }, 3000);
        }
      });
  }
}
