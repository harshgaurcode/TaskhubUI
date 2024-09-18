import { Guid } from 'guid-typescript';
export interface addNewProject {
  projectName: string;
  description: string;
  projectImage?: File;
  projectDocs?: File;
  projectStatus: string;
  projectProgress: number;
  clientName: string;
  managedBy: Guid;
  developerIds: any[];
  qaId: Guid;
}
