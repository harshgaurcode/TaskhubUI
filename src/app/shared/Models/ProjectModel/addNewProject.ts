import { Guid } from 'guid-typescript';
export class addNewProject {
  projectName: string = '';
  description: string = '';
  projectImage: File = {} as File;
  projectDocs: File = {} as File;
  projectStatus: string = '';
  projectProgress: number = 0;
  clientName: string = '';
  managedBy: Guid = Guid.create();
  developerIds: any[] = [];
  qaId: Guid = Guid.create();
}
