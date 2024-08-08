import { Component, OnInit } from '@angular/core';
import { UserLoginModel } from '../../shared/Models/userLoginModel';
import { AuthService } from '../service/auth.service';
import { ApiResponse } from '../../shared/Models/ApiResponse';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PopupService } from '../../shared/popups/popupservice';
import { AuthResult } from '../../shared/Models/AuthResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isPopupVisible = false;
  constructor(
    private authservice: AuthService,
    private router: Router,
    private popupService: PopupService
  ) {}

  // //Popup
  // ngOnInit(): void {
  //   this.popupDisplay.popupVisibility$.subscribe(
  //     (isVisible) => (this.isPopupVisible = isVisible)
  //   );
  // }

  // showPopup(): void {
  //   this.popupService.showPopup();
  // }

  // hidePopup(): void {
  //   this.popupService.hidePopup();
  // }
  // /////////
  LoginCred: UserLoginModel = new UserLoginModel();
  popupDisplay: Subject<boolean> = new Subject<boolean>();
  onLogin() {
    this.authservice.Login(this.LoginCred).subscribe(
      (response: ApiResponse<AuthResult>) => {
        if (response.isSuccess) {
          console.log('Login Successfull', response.result);
          localStorage.setItem('Token', response.result.token);

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
