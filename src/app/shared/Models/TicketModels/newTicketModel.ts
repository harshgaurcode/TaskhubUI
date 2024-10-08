import { Guid } from 'guid-typescript';

export class newTicketModel {
  projectId: Guid = Guid.create();
  taskId: string = '';
  task: string = '';
  taskDescription: string = '';
  taskType: string = '';
  assignedToId: Guid = Guid.create();
  assignedById: Guid = Guid.create();
  status: number = 0;
  relatedDocs: File = {} as File;
  estimatedTime: Date = new Date();
  priority: number = 0;
}
