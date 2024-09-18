import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../service/layout.service';
import { profileModel } from '../../shared/Models/UserModel/profileModel';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { SharedService } from '../../shared/services/shared.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  token: string | null = localStorage.getItem('Token');
  decodedToken: any;
  dataLoaded: boolean = true;
  UserImagePath: string = '';
  userProfileImageUrl: string = '';
  userSignatureImageUrl: string = '';

  profileData: profileModel | null = null;
  constructor(
    private _service: LayoutService,
    private sharedMethods: SharedService
  ) {}
  ngOnInit(): void {
    if (this.token) {
      this.decodedToken = jwtDecode(this.token);
      this.getUserProfile(this.decodedToken.UserId);
    } else {
      console.error('No token found');
    }
  }
  getUserProfile(userId: any) {
    this.dataLoaded = false;
    this._service.getUserProfile(userId).subscribe(
      (profile) => {
        this.profileData = profile;
        this.dataLoaded = true;
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
        // Handle errors
      }
    );
  }
}
