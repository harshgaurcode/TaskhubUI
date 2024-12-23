import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../service/admin.service';
import { RequestModel } from '../../../../shared/Models/Admin/requestModel';
import { Guid } from 'guid-typescript';
import { RoleModel } from '../../../../shared/Models/Admin/RoleModel';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.css',
})
export class RoleComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  request: RequestModel[] = [];
  role: RoleModel[] = [];

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.adminService.getPendingRequests().subscribe(
      (response: any) => {
        this.request = response.result;
        console.log(this.request);
        console.log(response);
      },
      (error) => console.log(error)
    );
    this.adminService.getRole().subscribe(
      (response: any) => {
        this.role = response.result;
        console.log(this.role);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteUser(userID: any) {
    console.log(userID);
  }
  approveRequest(userID: any, roleId: any) {
    console.log(userID, roleId);
    this.adminService
      .approveRequest(userID, roleId)
      .pipe(switchMap(() => this.adminService.getPendingRequests()))
      .subscribe(
        (response: any) => {
          this.request = response.result;
          console.log(this.request);
          console.log(response);
        },
        (error) => console.log(error)
      );
  }
}
