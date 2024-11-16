import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../service/admin.service';
import { AllUsersModel } from '../../../../shared/Models/Admin/Users/AllUsersModel';
import { Guid } from 'guid-typescript';
import { ModalService } from '../../../../shared/services/modal.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  confirmationModal: boolean = false;
  userId: any;
  ngOnInit(): void {
    this.getAllUsers();
  }
  constructor(
    private adminService: AdminService,
    private modalService: ModalService
  ) {}
  usersData: AllUsersModel[] = [];
  getAllUsers() {
    this.adminService.getAllUsers().subscribe((response) => {
      this.usersData = response.result;
      console.log(this.usersData);
    });
  }

  openConfirmationModal(userId: any) {
    this.userId = userId;
    this.confirmationModal = true;
    this.modalService.openModal();
  }

  closeConfirmationModal() {
    this.confirmationModal = false;
    this.modalService.closeModal();
  }

  deleteUser() {
    console.log('clicked');
    let userIdStr = String(this.userId);
    this.adminService.deleteUser(userIdStr).subscribe((response) => {
      console.log('User Deleted Successfully');
    });
  }
}
