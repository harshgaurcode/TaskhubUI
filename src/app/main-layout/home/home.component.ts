import { Component, OnInit } from '@angular/core';
import { Pipe } from '@angular/core';
import { ProjectService } from '../project/service/project.service';
import { ProjectListResponse } from '../../shared/Models/ProjectModel/ProjectListResponse';
import { LayoutService } from '../service/layout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  userName: any;
  newsData: any;
  newsArticles: any[] = []; // To store articles from the API
  totalResults: number = 0;
  projectList: ProjectListResponse[] = [];
  constructor(
    private _service: ProjectService,
    private layoutService: LayoutService
  ) {}
  ngOnInit(): void {
    this.userName = localStorage.getItem('User');
    this.getAllProjects();
    this.getQuote();
    this.getNews();
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
  getNews() {
    this.layoutService.getNewsData().subscribe(
      (data) => {
        this.newsData = data;
        this.newsArticles = data.results;
        this.totalResults = data.totalResults;
        console.log(this.newsData);
      },
      (error) => {
        console.error('Error fetching news:', error);
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
