import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ApiResponse } from '../../../shared/Models/ApiResponse';
import { ProjectListResponse } from '../../../shared/Models/ProjectModel/ProjectListResponse';
import { addNewProject } from '../../../shared/Models/ProjectModel/addNewProject';
import { ticketResponseArray } from '../../../shared/Models/TicketModels/ticketResponseArray';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}
  projectById(projectId: any): Observable<ApiResponse<ProjectListResponse>> {
    const params = new HttpParams().set('projectId', projectId);
    return this.http.get<ApiResponse<ProjectListResponse>>(
      `${environment.apiBaseUrl}/api/Project/GetProjectById`,
      { params }
    );
  }
  projectList(): Observable<ApiResponse<ProjectListResponse>> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.http.get<ApiResponse<ProjectListResponse>>(
      `${environment.apiBaseUrl}/api/Project/GetProjects`,
      { headers }
    );
  }
  AddProject(projectData: any): Observable<ApiResponse<any>> {
    //Pass Jwt from internal storage
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.http.post<ApiResponse<any>>(
      `${environment.apiBaseUrl}/api/Project/AddProject`,
      projectData,
      { headers }
    );
  }

  getquote(): Observable<any> {
    return this.http.get<any>('https://zenquotes.io/api/image');
  }

  getdevelopersList(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiBaseUrl}/api/Admin/GetAllDeveloper`
    );
  }

  getmanagerList(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiBaseUrl}/api/Admin/GetAllManagers`
    );
  }

  getticketsbyprojectid(
    projectId: any
  ): Observable<ApiResponse<ticketResponseArray[]>> {
    return this.http.get<ApiResponse<ticketResponseArray[]>>(
      `${environment.apiBaseUrl}/api/Project/GetTaskById/`,
      {
        params: { projectId: projectId },
      }
    );
  }

  AddTicket(ticketData: any) {
    //Pass Jwt from internal storage
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.http.post<any>(
      `${environment.apiBaseUrl}/api/Project/CreateTask/`,
      ticketData
    );
  }

  changestatus(ticket: string, status: string): Observable<ApiResponse<any>> {
    const body = {
      taskId: ticket,
      status: status,
    };
    return this.http.patch<ApiResponse<any>>(
      `${environment.apiBaseUrl}/api/Project/UpdateStatus`,
      body
    );
  }
  private getToken(): string {
    return localStorage.getItem('Token') || '';
  }
}
