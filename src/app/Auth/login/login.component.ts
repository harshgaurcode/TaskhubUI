import { Component } from '@angular/core';
import { UserLoginModel } from '../../shared/Models/userLoginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  LoginCred: UserLoginModel = new UserLoginModel();
  onLogin() {}
}
