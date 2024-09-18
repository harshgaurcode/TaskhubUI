import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-kanban',
  templateUrl: './project-kanban.component.html',
  styleUrl: './project-kanban.component.css',
})
export class ProjectKanbanComponent implements OnInit {
  ticketsArray: any[] = [];
  selectedProjectData: any;
  status: string[] = ['To Do', 'In Progress', 'InQa', 'Done'];

  tickets: any[] = [];

  constructor() {}
  ngOnInit(): void {
    // Initialize dummy data
    this.selectedProjectData = {
      projectName: 'Sample Project',
      projectImage: 'https://via.placeholder.com/150',
      description: 'This is a sample project description.',
      projectStatus: 'In Progress',
      createdTimeStamp: new Date().toISOString(),
      projectProgress: 50, // Dummy progress value
    };

    this.tickets = [
      {
        summary: 'Ticket 1 Summary',
        status: 'To Do',
        assignedTo: 'User A',
        hours: 5,
      },
      {
        summary: 'Ticket 2 Summary',
        status: 'In Progress',
        assignedTo: 'User B',
        hours: 3,
      },
      {
        summary: 'Ticket 3 Summary',
        status: 'Done',
        assignedTo: 'User C',
        hours: 2,
      },
    ];
  }

  getProjectTickets(id: number) {
    return 'Somethink';
  }

  filterTicket(status: string) {
    return this.ticketsArray.filter((m) => m.status == status);
  }
}
