import { Guid } from 'guid-typescript';

export interface TeamModel {
  id: Guid;
  teamId: Guid;
  teamName: string;
  managerId: Guid;
  qaId: Guid;
  isActive: boolean;
  isDeleted: boolean;
}
