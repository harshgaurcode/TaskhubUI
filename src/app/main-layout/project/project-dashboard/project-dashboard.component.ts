import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { ProjectListResponse } from '../../../shared/Models/ProjectModel/ProjectListResponse';
import { addNewProject } from '../../../shared/Models/ProjectModel/addNewProject';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.css',
})
export class ProjectDashboardComponent implements OnInit {
  constructor(private _service: ProjectService) {}

  projectList: ProjectListResponse[] = [];
  ManagersList: any[] = [];
  DevelopersList: any[] = [];
  projectDetails: ProjectListResponse | null = null;
  userList: any[] = [];
  projectData: addNewProject = {
    projectName: '',
    description: '',
    projectImage: undefined, // Optional file
    projectDocs: undefined, // Optional file
    projectStatus: '',
    projectProgress: 0,
    clientName: '',
    managedBy: Guid.create(),
    developerIds: [],
    qaId: Guid.create(),
  };
  projectId: string = '';

  //Get Project By ID
  GetProjectDisciptions(projectId: any) {
    console.log(projectId);
    this._service.projectById(projectId).subscribe(
      (respose: any) => {
        this.projectDetails = respose.result;
        console.log(this.projectDetails);
      },
      (error) => {
        console.log(this.projectDetails);
      }
    );
  }

  ngOnInit(): void {
    this.getAllProjects();
    this.getAllUsers();
    this.getdevelopersList();
    this.getmanagerList();
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
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  NavigateToKanban(projectId: any) {}

  setProject(obj: any) {
    return null;
  }

  getAllProjects() {
    this._service.projectList().subscribe(
      (response: any) => (this.projectList = response.result),
      (error) => {
        console.error('Failed to load projects:', error);
      }
    );
  }
  getAllUsers() {
    return null;
  }

  onSubmit(): void {
    const formData = new FormData();

    // // Append fields to FormData
    // formData.append('ProjectName', this.projectData.projectName);
    // formData.append('ProjectProgress', this.projectData.projectProgress);
    // formData.append('ProjectStatus', this.projectData.projectStatus);
    // formData.append('QaId', this.projectData.qaId);
    // formData.append('ManagedBy', this.projectData.managedBy);
    // formData.append('ClientName', this.projectData.clientName);
    // formData.append('Description', this.projectData.description);
    this._service.AddProject(this.projectData).subscribe(
      (res: any) => console.log('Add Successfully', res),
      (error) => {
        console.error('Faild to Add Project', error);
      }
    );
    console.log(this.projectData);
  }
}
