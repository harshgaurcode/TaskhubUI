import { Component } from '@angular/core';
import { UserRegisterModel } from '../../shared/Models/userRegisterModel';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private authServices: AuthService, private router: Router) {}
  RegisterCred: UserRegisterModel = new UserRegisterModel();
  isSuccess: boolean = false;

  popupDisplay: Subject<boolean> = new Subject<boolean>();
  onRegister() {
    console.log(this.RegisterCred);
    this.authServices.Register(this.RegisterCred).subscribe(
      (response) => {
        setTimeout(() => {
          // this.popupDisplay.next(true);
          this.router.navigateByUrl('');
        }, 5000);
      },
      (error) => {
        console.log('Registration failed', error);
      }
    );
  }
}
