import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { newTicketModel } from '../../../shared/Models/TicketModels/newTicketModel';
import { ticketResponseArray } from '../../../shared/Models/TicketModels/ticketResponseArray';

import { SnackbarService } from '../../../shared/services/snackbar.service';

import { ModalService } from '../../../shared/services/modal.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-project-kanban',
  templateUrl: './project-kanban.component.html',
  styleUrl: './project-kanban.component.css',
})
export class ProjectKanbanComponent implements OnInit {
  loading: boolean = true;
  ticketsArrays: ticketResponseArray[] = [] as ticketResponseArray[];
  taskData: newTicketModel = new newTicketModel();
  selectedProjectData: any;
  status: string[] = ['To-Do', 'In-Progress', 'InQa', 'Done'];
  JsonData: any[] = JSON.parse(localStorage.getItem('projectData') || '{}');
  projectId: any = localStorage.getItem('projectId');
  DevelopersList: any[] | null = null;
  draggedTicket: string = '';
  noData: boolean = false;
  ticketModal = false;
  @ViewChild('ticketForm') ticketForm: NgForm | undefined;
  constructor(
    private service: ProjectService,
    private toastservice: SnackbarService,
    private modalService: ModalService
  ) {}
  ngOnInit(): void {
    this.selectedProjectData = this.JsonData;
    this.getProjectTickets(this.projectId);
    this.DevelopersList = JSON.parse(localStorage.getItem('Dev') || '[]');
  }

  openTicketModal() {
    this.ticketForm?.reset();
    this.ticketModal = true;
    this.modalService.openModal();
  }
  closeTicketModal() {
    this.ticketForm?.reset();
    this.ticketModal = false;
  }
  getProjectTickets(id: any) {
    this.service.getticketsbyprojectid(id).subscribe(
      (response) => {
        console.log(response);
        this.ticketsArrays = response.result;
        console.log(this.ticketsArrays);
        this.loading = false;
        console.log(this.ticketsArrays);
        if (this.ticketsArrays.length == 0) {
          this.toastservice.showinfo('No Data Found', 'No Data');
          this.noData = true;
        }
      },
      (error) => {
        this.toastservice.showerror(
          'Something went wrong please try again',
          'Error'
        );
        console.log(error);
      }
    );
  }
  onDragStart(ticket: string) {
    this.draggedTicket = ticket;
    console.log(this.draggedTicket);
  }
  onDrop(event: DragEvent, status: string) {
    event.preventDefault();

    console.log('dropped:' + this.draggedTicket);
    this.moveTicket(this.draggedTicket, status);
  }
  moveTicket(ticket: string, status: string) {
    this.service.changestatus(ticket, status).subscribe(
      (response) => {
        console.log('moved'), this.getProjectTickets(this.projectId);
      },
      (error) => console.log('Not Moved')
    );
    console.log('moved');
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
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
