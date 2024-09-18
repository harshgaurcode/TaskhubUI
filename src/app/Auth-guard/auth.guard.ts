import { CanActivate, Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { SharedService } from '../shared/services/shared.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private sharedService: SharedService, private router: Router) {}
  canActivate(): boolean {
    const token = localStorage.getItem('Token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return true;
    } else {
      this.sharedService.showToast(
        'Please log in to access this page.',
        'error'
      );

      this.router.navigateByUrl('');
      return false;
    }
  }
}
