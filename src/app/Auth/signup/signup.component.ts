import { Component } from '@angular/core';
import { UserRegisterModel } from '../../shared/Models/userRegisterModel';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  RegisterCred: UserRegisterModel = new UserRegisterModel();

  onRegister() {
    console.log(this.RegisterCred);
  }
}
