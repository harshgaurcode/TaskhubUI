import { Component, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from '../service/layout.service';
import { profileModel } from '../../shared/Models/UserModel/profileModel';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { SharedService } from '../../shared/services/shared.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { ModalService } from '../../shared/services/modal.service';
import { GetProfileModel } from '../../shared/Models/UserModel/getProfileModel';
import { ApiResponse } from '../../shared/Models/ApiResponse';
import { switchMap } from 'rxjs';
import { TokenService } from '../../shared/services/token.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userId: string | null = '';

  UserImagePath: string = '';
  userProfileImageUrl: string = '';
  userSignatureImageUrl: string = '';

  profileData: profileModel = {
    userName: '',
    email: '',
    userRole: null,
    signature: {} as File,
    profile: {} as File,
    address: '',
    userContact: '',
    Password: '',
    PhoneNumber: '',
    Name: '',
    AlternateContact: '',
    UserId: '',
  };

  getProfiledata: GetProfileModel = {
    userName: '',
    email: '',
    role: null,
    signature: '',
    userProfile: '',
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
    private modalService: ModalService,
    private tokenService: TokenService
  ) {}

  isEditModal: boolean = false;
  ngOnInit(): void {
    this.userId = this.tokenService.getUserId();
    this.getUserProfile(this.userId);
  }

  openEditModal() {
    this.isEditModal = true;
    this.modalService.openModal();
  }
  closeEditModal() {
    this.isEditModal = false;
    this.modalService.closeModal();
  }

  getUserProfile(userId: any) {
    this.spinnerService.show();
    this._service
      .getUserProfile(userId)
      .subscribe((profile: ApiResponse<any>) => {
        this.getProfiledata = profile.result;

        this.spinnerService.hide();
        if (this.profileData) {
          this.userProfileImageUrl = this.sharedMethods.getFullImageUrl(
            this.getProfiledata.userProfile
          );
        } else {
          console.error('Profile data is null');
        }
        console.log(this.profileData);
      });
  }
  // onFileChange(event: any, field: string) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     if (field === 'userProfile') {
  //       this.profileData.profile = file; // Assign the actual file
  //     } else if (field === 'signature') {
  //       this.profileData.signature = file; // Assign the actual file
  //     }
  //   }
  // }

  onFileChange(event: any, type: string) {
    this.sharedMethods.onFileChange(event, type, (file) => {
      if (type === 'userProfile') {
        this.profileData.profile = file;
      } else if (type === 'signature') {
        this.profileData.signature = file;
      }
    });
  }

  updateUserProfile() {
    const formData = new FormData();
    formData.append('UserId', this.userId ? this.userId.toString() : '');
    formData.append('AlternateContact', this.profileData.AlternateContact);
    formData.append('Name', this.profileData.Name);
    formData.append('Address', this.profileData.address);
    formData.append('UserName', this.profileData.userName);
    formData.append('PhoneNumber', this.profileData.PhoneNumber);
    formData.append('Signature', this.profileData.signature);
    formData.append('Password', this.profileData.Password);
    formData.append('Email', this.profileData.email);
    formData.append('UserProfile', this.profileData.profile);
    formData.append('Signature', this.profileData.signature);

    this.spinnerService.show();
    this._service
      .updateUserProfile(formData)
      .pipe(switchMap(() => this._service.getUserProfile(this.userId)))
      .subscribe((profile: ApiResponse<any>) => {
        this.getProfiledata = profile.result;
        console.log(this.getProfiledata);

        this.spinnerService.hide();
        if (this.profileData) {
          this.userProfileImageUrl = this.sharedMethods.getFullImageUrl(
            this.getProfiledata.userProfile
          );
          this.userSignatureImageUrl = this.sharedMethods.getFullImageUrl(
            this.getProfiledata.signature
          );
        } else {
          console.error('Profile data is null');
        }
        console.log(this.profileData);
      });
  }
}
