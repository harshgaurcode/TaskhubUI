import { Guid } from 'guid-typescript';

export interface RequestModel {
  name: string;
  userName: string;
  id: Guid;
  phoneNumber: string;
  isAuthenticated: boolean;

  RoleId: Guid | null;
}
