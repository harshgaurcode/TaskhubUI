import { CanActivate, Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    const localData = localStorage.getItem('Token');
    if (localData != null) {
      return true;
    } else {
      this.router.navigateByUrl('');
      return false;
    }
  }
}
