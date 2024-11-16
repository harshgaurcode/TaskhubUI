import { Component, OnInit } from '@angular/core';
import { Pipe } from '@angular/core';
import { ProjectService } from '../project/service/project.service';
import { ProjectListResponse } from '../../shared/Models/ProjectModel/ProjectListResponse';
import { LayoutService } from '../service/layout.service';
import { TeamDetails } from '../../shared/Models/Admin/TeamData/teamDetails';
import { SpinnerService } from '../../shared/services/spinner.service';
import { ApiResponse } from '../../shared/Models/ApiResponse';
import { User } from '../../shared/Models/Admin/TeamData/user';
import { DatePipe } from '@angular/common';
import { Quote } from '../../shared/Models/Quote';

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
    private _spinnerService: SpinnerService,
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
  // getQuote() {
  //   this.layoutService.getquote('success').subscribe((response) => {
  //     this.quote = response;
  //     console.log(response);
  //   });
  // }
  teamId = localStorage.getItem('TeamId') ?? '';

  teamDetails: TeamDetails = {
    manager: {
      name: '',
      email: '',
      phoneNumber: '',
      role: '',
      userProfile: '',
    },
    developers: [],
    projects: [],
  };

  date_time: Date = new Date();
  quote: any;
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
    this._spinnerService.show();
    this._service
      .projectList(this.teamId)
      .subscribe((response: ApiResponse<any>) => {
        this._spinnerService.hide();
        this.projectList = response.result;
      });
  }
  GetTeam() {
    this.layoutService
      .getTeamMembersData(this.teamId)
      .subscribe((response: ApiResponse<any>) => {
        this.teamDetails = response.result;
        localStorage.setItem(
          'Developers',
          this.teamDetails.developers.toString()
        );
      });
  }
}
