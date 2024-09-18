import { Component } from '@angular/core';
import { AuthService } from '../../Auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  constructor(private authservice: AuthService, private router: Router) {}
  logout() {
    this.authservice.logout().subscribe(() => {});
  }
}
