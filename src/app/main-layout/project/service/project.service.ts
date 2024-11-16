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
  projectList(teamId: string): Observable<ApiResponse<ProjectListResponse>> {
    const params = new HttpParams().append('teamId', teamId);

    return this.http.get<ApiResponse<ProjectListResponse>>(
      `${environment.apiBaseUrl}/api/Project/GetProjects`,
      { params }
    );
  }
  AddProject(projectData: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${environment.apiBaseUrl}/api/Project/AddProject`,
      projectData,
      {}
    );
  }

  getticketsbyprojectid(
    projectId: string
  ): Observable<ApiResponse<ticketResponseArray[]>> {
    const params = new HttpParams().set('projectId', projectId);
    return this.http.get<ApiResponse<ticketResponseArray[]>>(
      `${environment.apiBaseUrl}/api/Project/GetTaskById/`,
      {
        params,
      }
    );
  }

  AddTicket(ticketData: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
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

  deleteProject(projectId: string): Observable<ApiResponse<any>> {
    const params = new HttpParams().set('projectId', projectId);
    return this.http.post<ApiResponse<any>>(
      `${environment.apiBaseUrl}/api/Project/DeleteProject`,
      {},
      {
        params,
      }
    );
  }

  getDevelopers(teamId: any): Observable<ApiResponse<any>> {
    const params = new HttpParams().set('teamId', teamId);
    return this.http.get<ApiResponse<any>>(
      `${environment.apiBaseUrl}/api/Admin/GetAllDeveloper`,
      { params }
    );
  }

  deleteTicket(Id: string): Observable<ApiResponse<any>> {
    const params = new HttpParams().set('taskId', Id);
    return this.http.post<ApiResponse<any>>(
      `${environment.apiBaseUrl}/api/Project/DeleteTask`,
      {},
      { params }
    );
  }
}
