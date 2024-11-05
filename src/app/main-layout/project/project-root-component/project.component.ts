import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit {
  token: any = localStorage.getItem('Token');
  decodedToken: any;
  role: string = '';
  ngOnInit(): void {
    this.getRole();
  }

  getRole() {
    if (this.token) {
      this.decodedToken = jwtDecode(this.token);
      this.role = this.decodedToken.Role;
      console.log(this.role);
    } else {
      console.error('No token found');
    }
  }
}
