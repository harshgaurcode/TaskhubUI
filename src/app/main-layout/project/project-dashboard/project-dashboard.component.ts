import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { ProjectListResponse } from '../../../shared/Models/ProjectModel/ProjectListResponse';
import { Guid } from 'guid-typescript';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/services/shared.service';
import { addNewProject } from '../../../shared/Models/ProjectModel/addNewProject';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.css',
})
export class ProjectDashboardComponent implements OnInit {
  constructor(
    private _service: ProjectService,
    private router: Router,
    private sharedMethods: SharedService
  ) {}

  selectedProject: any = null;
  projectList: ProjectListResponse[] = [];
  ManagersList: any[] = [];
  DevelopersList: any[] = [];
  projectDetails: ProjectListResponse | null = null;
  userList: any[] = [];
  projectimageurl: string = '';
  projectdocsurl: string = '';

  projectData: addNewProject = new addNewProject();
  projectId: any = '';

  ngOnInit(): void {
    this.getAllProjects();
    this.getAllUsers();
    this.getdevelopersList();
    this.getmanagerList();
    localStorage.removeItem('projectId');
  }
  getmanagerList() {
    this._service.getmanagerList().subscribe(
      (response: any) => {
        this.ManagersList = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getdevelopersList() {
    this._service.getdevelopersList().subscribe(
      (response: any) => {
        this.DevelopersList = response;
        localStorage.setItem('Dev', JSON.stringify(this.DevelopersList));
        console.log(this.DevelopersList);
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Get Project By ID
  GetProjectDisciptions(projectId: any) {
    this._service.projectById(projectId).subscribe(
      (respose: any) => {
        this.projectDetails = respose.result;
        this.selectproject(projectId);
        if (this.projectDetails) {
          this.projectimageurl = this.sharedMethods.getFullImageUrl(
            this.projectDetails.projectImage
          );
          this.projectdocsurl = this.sharedMethods.getFullImageUrl(
            this.projectDetails.projectDocs
          );
        }
        console.log(this.projectDetails);
      },
      (error) => {
        console.log(this.projectDetails);
      }
    );
  }
  NavigateToKanban(projectId: any) {}

  getAllProjects() {
    this._service.projectList().subscribe(
      (response: any) => {
        this.projectList = response.result;
      },
      (error) => {
        console.error('Failed to load projects:', error);
      }
    );
  }
  getAllUsers() {
    return null;
  }

  onFileChange(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      if (field === 'projectimage') {
        this.projectData.projectImage = file; // Assign the actual file
      } else if (field === 'projectdoc') {
        this.projectData.projectDocs = file; // Assign the actual file
      }
    }
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
    formData.append(
      'QaId',
      this.projectData.qaId ? this.projectData.qaId.toString() : ''
    );
    formData.append(
      'ManagedBy',
      this.projectData.managedBy ? this.projectData.managedBy.toString() : ''
    );
    // Handle DeveloperIds array (send each ID separately)
    if (
      this.projectData.developerIds &&
      this.projectData.developerIds.length > 0
    ) {
      this.projectData.developerIds.forEach((developerId: Guid) => {
        formData.append('DeveloperIds', developerId.toString()); // Convert each GUID to string
      });
    } else {
      formData.append('DeveloperIds', ''); // Send empty value if DeveloperIds array is empty
    }
    formData.append('ClientName', this.projectData.clientName);
    formData.append('Description', this.projectData.description);
    this._service.AddProject(formData).subscribe(
      (res: any) => console.log('Add Successfully', res),
      (error) => {
        console.error('Faild to Add Project', error);
      }
    );
    console.log(this.projectData);
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
