import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Auth/service/auth.service';
import { Router } from '@angular/router';
import { LayoutService } from '../service/layout.service';
import { ModalService } from '../../shared/services/modal.service';
import { TokenService } from '../../shared/services/token.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit {
  newsData: any;

  isLogout: boolean = false;
  constructor(
    private authservice: AuthService,
    private router: Router,
    private modalService: ModalService,
    private tokenService: TokenService
  ) {}
  ngOnInit(): void {}

  logout() {
    this.tokenService.logout();
    this.router.navigateByUrl('auth');
  }

  openModal() {
    this.isLogout = true;
    this.modalService.openModal();
  }
  closeModal() {
    this.modalService.closeModal();
    this.isLogout = false;
  }
}
