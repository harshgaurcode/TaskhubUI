import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { newTicketModel } from '../../../shared/Models/TicketModels/newTicketModel';
import { ticketResponseArray } from '../../../shared/Models/TicketModels/ticketResponseArray';
import { ToastrService } from 'ngx-toastr';
import { SnackbarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'app-project-kanban',
  templateUrl: './project-kanban.component.html',
  styleUrl: './project-kanban.component.css',
})
export class ProjectKanbanComponent implements OnInit {
  ticketsArrays: ticketResponseArray[] = [] as ticketResponseArray[];
  taskData: newTicketModel = new newTicketModel();
  selectedProjectData: any;
  status: string[] = ['To-Do', 'In-Progress', 'InQa', 'Done'];
  JsonData: any[] = JSON.parse(localStorage.getItem('projectData') || '{}');
  projectId: any = localStorage.getItem('projectId');
  DevelopersList: any[] | null = null;
  // tickets: Ticket[] = [];

  constructor(
    private service: ProjectService,
    private toastservice: SnackbarService
  ) {}
  ngOnInit(): void {
    this.selectedProjectData = this.JsonData;
    this.getProjectTickets(this.projectId);
    this.DevelopersList = JSON.parse(localStorage.getItem('Dev') || '[]');
  }

  getProjectTickets(id: any) {
    this.service.getticketsbyprojectid(id).subscribe(
      (response) => (
        console.log(response),
        (this.ticketsArrays = response.result),
        console.log(this.ticketsArrays)
      ),
      (error) => console.log(error)
    );
  }
  onDragStart($event: DragEvent, _t23: ticketResponseArray) {
    // this.draggedTicket = ticket;
    // event.dataTransfer?.setData('text/plain', JSON.stringify(ticket));
  }
  onDrop(event: DragEvent, arg1: string[]) {
    event.preventDefault();
    const ticket = JSON.parse(
      event.dataTransfer?.getData('text/plain') || '{}'
    );
    this.moveTicket(ticket, status);
    console.log('dropped');
  }
  moveTicket(ticket: any, status: string) {
    console.log('moved');
  }
  onDragOver(event: DragEvent) {
    event.preventDefault(); // Allow the drop
  }

  filterTicket(status: string) {
    return this.ticketsArrays.filter((ticket) => ticket.type === status);
  }

  onFileChange(event: any, arg1: string) {
    const file = event.target.files;
    if (file) {
      this.taskData.relatedDocs = file; // Assign the actual file
    }
  }
  onSubmit() {
    const formData = new FormData();

    formData.append('ProjectId', this.projectId);
    formData.append('TaskId', this.taskData.taskId);
    formData.append('Task', this.taskData.task);
    formData.append('TaskDescription', this.taskData.taskDescription);
    formData.append('TaskType', 'In-Progress');
    formData.append('AssignedToId', this.taskData.assignedToId.toString());
    formData.append('Status', this.taskData.status.toString());
    formData.append('RelatedDocs', this.taskData.relatedDocs); // Assuming this.selectedFile holds the file
    formData.append('EstimatedTime', this.taskData.estimatedTime.toString());
    formData.append('Priority', this.taskData.priority.toString());

    this.service.AddTicket(formData).subscribe(
      (response) => {
        console.log(response);
        this.toastservice.showsuccess(
          'Ticket is submitted SuccessFully',
          'Success'
        );
      },
      (error) => {
        this.toastservice.showerror('Ticket is submission is failed', 'Failed');
        console.log(error);
      }
    );
  }
}
