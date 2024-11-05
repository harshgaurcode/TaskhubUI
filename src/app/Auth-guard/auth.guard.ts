import { CanActivate, Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { SharedService } from '../shared/services/shared.service';
import { SnackbarService } from '../shared/services/snackbar.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private snackBarService: SnackbarService,
    private router: Router
  ) {}
  canActivate(): boolean {
    const token = localStorage.getItem('Token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return true;
    } else {
      this.snackBarService.showerror('Please login to access', 'Login');

      this.router.navigateByUrl('');
      return false;
    }
  }
}
