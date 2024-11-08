import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from '../service/layout.service';
import { profileModel } from '../../shared/Models/UserModel/profileModel';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { SharedService } from '../../shared/services/shared.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { ModalService } from '../../shared/services/modal.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  token: string | null = localStorage.getItem('Token');
  userId: string = '';
  decodedToken: any;
  dataLoaded: boolean = true;
  UserImagePath: string = '';
  userProfileImageUrl: string = '';
  userSignatureImageUrl: string = '';

  profileData: profileModel = {
    userName: '',
    email: '',
    userRole: null,
    signature: '',
    profile: '',
    address: '',
    userContact: '',
    Password: '',
    PhoneNumber: '',
    Name: '',
    AlternateContact: '',
    UserId: '',
  };
  constructor(
    private _service: LayoutService,
    private sharedMethods: SharedService,
    private spinnerService: SpinnerService,
    private snackbarService: SnackbarService,
    private modalService: ModalService
  ) {}
  ngOnInit(): void {
    if (this.token) {
      this.decodedToken = jwtDecode(this.token);
      this.userId = this.decodedToken.UserId;
      console.log(this.userId);
      this.getUserProfile(this.decodedToken.UserId);
    } else {
      console.error('No token found');
    }
  }

  //Modal Toggel Methods
  openModal() {
    this.modalService.openModal();
  }
  closeModal() {
    this.modalService.closeModal();
  }

  getUserProfile(userId: any) {
    this.dataLoaded = false;
    this.spinnerService.show();
    this._service.getUserProfile(userId).subscribe(
      (profile) => {
        this.profileData = profile;
        this.dataLoaded = true;
        this.spinnerService.hide();
        if (this.profileData) {
          this.userProfileImageUrl = this.sharedMethods.getFullImageUrl(
            this.profileData.profile
          );
          this.userSignatureImageUrl = this.sharedMethods.getFullImageUrl(
            this.profileData.signature
          );
        } else {
          console.error('Profile data is null');
        }
        console.log(this.profileData);
      },
      (error) => {
        this.spinnerService.hide();
      }
    );
  }

  updateUserProfile() {
    const formData = new FormData();
    formData.append('UserId', this.userId.toString());
    formData.append('AlternateContact', this.profileData.AlternateContact);
    formData.append('Name', this.profileData.Name);
    formData.append('Address', this.profileData.address);
    formData.append('UserName', this.profileData.userName);
    formData.append('PhoneNumber', this.profileData.PhoneNumber);
    formData.append('Signature', this.profileData.signature);
    formData.append('Password', this.profileData.Password);
    formData.append('Email', this.profileData.email);
    this.spinnerService.show();
    this._service.updateUserProfile(formData).subscribe(
      (response) => {
        this.spinnerService.hide();
        this.snackbarService.showsuccess('User Profile Updated Successfully');
        console.log('User profile updated successfully', response);
      },
      (error) => {
        this.spinnerService.hide();
        this.snackbarService.showsuccess(
          'something went wrong please retry later'
        );
        console.error('Error updating user profile', error);
      }
    );
  }
}
