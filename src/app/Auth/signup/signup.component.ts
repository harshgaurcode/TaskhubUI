import { Component } from '@angular/core';
import { UserRegisterModel } from '../../shared/Models/userRegisterModel';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private authServices: AuthService, private router: Router) {}
  RegisterCred: UserRegisterModel = new UserRegisterModel();
  isSuccess: boolean = false;

  onFileChange(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      if (field === 'UserProfile') {
        this.RegisterCred.userProfile = file; // Assign the actual file
      } else if (field === 'Signature') {
        this.RegisterCred.signature = file; // Assign the actual file
      }
    }
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

    console.log(this.RegisterCred);
    this.authServices.Register(formData).subscribe(
      (response) => {
        setTimeout(() => {
          this.router.navigateByUrl('');
        }, 5000);
      },
      (error) => {
        console.log('Registration failed', error);
      }
    );

    const toastElement = document.getElementById('toastId');
    if (toastElement) {
      const toast = new Toast(toastElement); // Create Bootstrap Toast instance
      toast.show(); // Show the toast
    } else {
      console.error('Toast element not found!');
    }
  }
}
