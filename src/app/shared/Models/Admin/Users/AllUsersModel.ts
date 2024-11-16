import { Guid } from 'guid-typescript';
import { RoleModel } from '../RoleModel';
import { Roles } from './roles';

export interface AllUsersModel {
  id: Guid;
  name: string;
  role: Roles;
  userName: string;
  roleId: Guid;
  isActive: boolean;
  phoneNumber: string;
  isAuthenticated: boolean;
}
