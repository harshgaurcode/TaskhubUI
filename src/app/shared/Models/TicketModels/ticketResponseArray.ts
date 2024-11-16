import { Guid } from 'guid-typescript';

export interface ticketResponseArray {
  id: Guid;
  projectId: string;
  project: string;
  taskId: string;
  title: string;
  discription: string;
  type: string;
  assigendToId: Guid;
  assignedTo: string;
  status: number;
  relatedDocs: string;
  createdTime: string;
  updatedTime: string;
  estimatedTime: string;
  priority: string;
}
