import { Component, OnInit } from '@angular/core';
import { Pipe } from '@angular/core';
import { ProjectService } from '../project/service/project.service';
import { ProjectListResponse } from '../../shared/Models/ProjectModel/ProjectListResponse';
import { LayoutService } from '../service/layout.service';
import { TeamDetails } from '../../shared/Models/Admin/TeamData/teamDetails';

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
    // this.getQuote();
    this.getNews();
    this.GetTeam();
  }
  teamId = localStorage.getItem('TeamId') ?? '';

  teamDetails: TeamDetails | null = null;

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
    this._service.projectList(this.teamId).subscribe(
      (response: any) => (this.projectList = response.result),
      (error) => {
        console.error('Failed to load projects:', error);
      }
    );
  }
  GetTeam() {
    console.log(this.teamId);

    this.layoutService.getTeamMembersData(this.teamId).subscribe(
      (response) => {
        console.log(response);
        this.teamDetails = response.result;
        console.log(this.teamDetails);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
