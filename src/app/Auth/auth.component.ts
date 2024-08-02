import { Component } from '@angular/core';
import { UserLoginModel } from '../shared/Models/userLoginModel';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  LoginCred: UserLoginModel = new UserLoginModel();
  onLogin() {
    console.log(this.LoginCred);
  }
}
