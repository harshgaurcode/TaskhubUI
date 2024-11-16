import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild, viewChild } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { ProjectListResponse } from '../../../shared/Models/ProjectModel/ProjectListResponse';
import { Guid } from 'guid-typescript';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/services/shared.service';
import { addNewProject } from '../../../shared/Models/ProjectModel/addNewProject';
import { ModalService } from '../../../shared/services/modal.service';
import { jwtDecode } from 'jwt-decode';
import { NgForm } from '@angular/forms';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { switchMap } from 'rxjs';
import { TokenService } from '../../../shared/services/token.service';
@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.css',
})
export class ProjectDashboardComponent implements OnInit {
  constructor(
    private _service: ProjectService,
    private router: Router,
    private sharedMethods: SharedService,
    private modalService: ModalService,
    private spinnerService: SpinnerService,
    private tokenService: TokenService
  ) {}
  @ViewChild('projectForm') projectForm: NgForm | undefined;
  selectedProject: any = null;
  projectList: ProjectListResponse[] = [];
  projectDetails: ProjectListResponse | null = null;
  userList: any[] = [];
  projectimageurl: string = '';
  projectdocsurl: string = '';
  isManager: boolean = false;
  isOpen = false;
  teamId = localStorage.getItem('TeamId') ?? '';
  role: string | null = '';
  isProject: boolean = false;
  isEdit: boolean = false;
  projectData: addNewProject = new addNewProject();
  projectId: any = '';

  ngOnInit(): void {
    this.spinnerService.show();
    this.getAllProjects();
    localStorage.removeItem('projectId');
    this.getRole();
  }

  getRole() {
    this.role = this.tokenService.getRole();
    if (this.role == 'Manager') {
      this.isManager = true;
    }
  }

  //Modal Toggel Methods
  openprojectModal() {
    this.projectForm?.reset();
    this.isProject = true;
    this.modalService.openModal();
  }
  closeprojectModal() {
    this.projectForm?.reset();
    this.isProject = false;
    this.modalService.closeModal();
  }

  openModal() {
    this.isEdit = true;
    this.modalService.openModal();
  }
  closeModal() {
    this.isEdit = false;
    this.modalService.closeModal();
  }

  //Get Project By ID {Get Specfic Project }
  GetProjectDisciptions(projectId: any) {
    this._service.projectById(projectId).subscribe((respose: any) => {
      this.projectDetails = respose.result;
      this.selectproject(projectId);
      if (this.projectDetails) {
        console.log(this.projectDetails.projectImage);
        this.projectimageurl = this.sharedMethods.getFullImageUrl(
          this.projectDetails.projectImage
        );
        console.log(this.projectimageurl);
        this.projectdocsurl = this.sharedMethods.getFullImageUrl(
          this.projectDetails.projectDocs
        );
      }
    });
  }

  getAllProjects() {
    this._service.projectList(this.teamId).subscribe((response: any) => {
      this.projectList = response.result;
      this.spinnerService.hide();
    });
  }

  // onFileChange(event: any, field: string) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     if (field === 'projectimage') {
  //       this.projectData.projectImage = file; // Assign the actual file
  //     } else if (field === 'projectdoc') {
  //       this.projectData.projectDocs = file; // Assign the actual file
  //     }
  //   }
  // }

  MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB in bytes
  ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];

  onFileChange(event: any, type: string) {
    this.sharedMethods.onFileChange(event, type, (file) => {
      if (type === 'projectimage') {
        this.projectData.projectImage = file;
      } else if (type === 'projectdoc') {
        this.projectData.projectDocs = file;
      }
    });
  }

  onSubmit(): void {
    const formData = new FormData();

    // Append fields to FormData
    formData.append('ProjectName', this.projectData.projectName);
    formData.append(
      'ProjectProgress',
      this.projectData.projectProgress
        ? this.projectData.projectProgress.toString()
        : ''
    );
    formData.append('ProjectStatus', this.projectData.projectStatus);
    formData.append('ProjectDocs', this.projectData.projectDocs);
    formData.append('ProjectImage', this.projectData.projectImage);
    formData.append('ClientName', this.projectData.clientName);
    formData.append('Description', this.projectData.description);
    formData.append('TeamId', this.teamId ?? '');
    this._service
      .AddProject(formData)
      .pipe(switchMap(() => this._service.projectList(this.teamId)))
      .subscribe((response: any) => {
        this.projectList = response.result;
        this.spinnerService.hide();
      });
  }

  deleteProject(arg0: Guid) {
    const Id = arg0.toString();
    console.log('Id', Id, typeof Id);
    this._service
      .deleteProject(Id)
      .pipe(switchMap(() => this._service.projectList(this.teamId)))
      .subscribe((response: any) => {
        this.projectList = response.result;
        this.spinnerService.hide();
      });
  }
  GetProjectTickets(projectId: any) {
    this.selectproject(projectId);
    this.router.navigateByUrl('main/project/board');
  }

  selectproject(projectId: any) {
    localStorage.setItem('projectId', projectId);
    localStorage.setItem('projectData', JSON.stringify(this.projectDetails));
  }
}
