import { Guid } from 'guid-typescript';

export interface profileModel {
  Password: string;
  PhoneNumber: string;
  Name: string;
  AlternateContact: string;
  UserId: string;
  userName: string;
  email: string;
  userRole: string | null;
  signature: File;
  profile: File;
  address: string;
  userContact: string;
}
