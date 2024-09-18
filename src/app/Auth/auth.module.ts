import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './Root/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';

@NgModule({
  declarations: [
    AuthComponent,
    SignupComponent,
    ForgotpasswordComponent,
    LoginComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, FormsModule, HttpClientModule],
  providers: [AuthService],
})
export class AuthModule {}
