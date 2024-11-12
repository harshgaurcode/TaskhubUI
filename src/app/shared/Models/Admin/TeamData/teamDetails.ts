import { User } from './user';

export interface TeamDetails {
  manager: User;
  developers: User[];
  projects: any[];
}
