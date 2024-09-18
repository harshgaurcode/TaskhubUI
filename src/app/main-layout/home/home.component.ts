import { Component, OnInit } from '@angular/core';
import { Pipe } from '@angular/core';
import { ProjectService } from '../project/service/project.service';
import { ProjectListResponse } from '../../shared/Models/ProjectModel/ProjectListResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  userName: any;

  projectList: ProjectListResponse[] = [];
  constructor(private _service: ProjectService) {}
  ngOnInit(): void {
    this.userName = localStorage.getItem('User');
    this.getAllProjects();
    this.getQuote();
  }

  date_time: Date = new Date();
  quote: string = '“Be yourself; everyone else is already taken.”';
  getQuote() {
    this._service.getquote().subscribe(
      (res) => (this.quote = res),
      (error) => {
        console.log(error);
      }
    );
  }
  getAllProjects() {
    this._service.projectList().subscribe(
      (response: any) => (this.projectList = response.result),
      (error) => {
        console.error('Failed to load projects:', error);
      }
    );
  }
}
