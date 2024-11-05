import { Guid } from 'guid-typescript';

export interface ProjectListResponse {
  projectId: Guid;

  projectName: string;

  description: string;

  projectImage: string;

  projectDocs: string;
  projectStatus: string;

  projectProgress: number;
  createdTimeStamp: Date;
}
