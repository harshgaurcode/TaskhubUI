import { Component } from '@angular/core';
import { UserRegisterModel } from '../../shared/Models/userRegisterModel';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

import { SnackbarService } from '../../shared/services/snackbar.service';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(
    private authServices: AuthService,
    private router: Router,
    private snackbarService: SnackbarService,
    private sharedMethods: SharedService
  ) {}
  RegisterCred: UserRegisterModel = new UserRegisterModel();
  isSuccess: boolean = false;

  // onFileChange(event: any, field: string) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     if (field === 'UserProfile') {
  //       this.RegisterCred.userProfile = file; // Assign the actual file
  //     } else if (field === 'Signature') {
  //       this.RegisterCred.signature = file; // Assign the actual file
  //     }
  //   }
  // }

  onFileChange(event: any, type: string) {
    this.sharedMethods.onFileChange(event, type, (file) => {
      if (type === 'UserProfile') {
        this.RegisterCred.userProfile = file;
      } else if (type === 'Signature') {
        this.RegisterCred.signature = file;
      }
    });
  }

  onRegister() {
    const formData = new FormData();
    formData.append('Name', this.RegisterCred.name);
    formData.append('Email', this.RegisterCred.email);
    formData.append('PhoneNumber', this.RegisterCred.phoneNumber);
    formData.append('UserProfile', this.RegisterCred.userProfile); // File input
    formData.append('Signature', this.RegisterCred.signature); // File input
    formData.append('Address', this.RegisterCred.address || ''); // Optional
    formData.append(
      'AlternateContact',
      this.RegisterCred.alternateContact || ''
    ); // Optional
    formData.append('Password', this.RegisterCred.password);
    formData.append('UserName', this.RegisterCred.userName);

    this.authServices.Register(formData).subscribe((response) => {
      this.snackbarService.showinfo(
        'We have sent An verification link to Your Registered Email Address ',
        'Info'
      );
      setTimeout(() => {
        this.router.navigateByUrl('');
      }, 5000);
    });
  }
}
