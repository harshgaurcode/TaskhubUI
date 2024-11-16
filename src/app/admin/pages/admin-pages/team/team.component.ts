import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../service/admin.service';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { TeamModel } from '../../../../shared/Models/Admin/teamModel';
import { TeamDetails } from '../../../../shared/Models/Admin/TeamData/teamDetails';
import { AddTeamModel } from '../../../../shared/Models/Admin/TeamData/addTeamModel';
import { GetUnListedEmployee } from '../../../../shared/Models/Admin/TeamData/getUnlistedEmployee';
import { ModalService } from '../../../../shared/services/modal.service';
import { CommonModel } from '../../../../shared/Models/Admin/TeamData/commonModel';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent implements OnInit {
  ngOnInit(): void {
    this.getTeamList();
    this.getUnlistedEmployees();
  }

  constructor(
    private adminService: AdminService,
    private modalService: ModalService,
    private spinnerService: SpinnerService,
    private snackbarService: SnackbarService
  ) {}

  teamData: TeamModel[] = [];
  AddTeamData: AddTeamModel = {
    teamName: '',
    managerId: '',
    developerIds: [],
  };
  addTeamModal: boolean = false;
  managerList: CommonModel[] = [];
  developerList: CommonModel[] = [];
  teamDetails: TeamDetails | null = null;
  getTeamList() {
    this.spinnerService.show();
    this.adminService.getTeam().subscribe((result: any) => {
      this.spinnerService.hide();

      this.teamData = result;
    });
  }
  getUnlistedEmployees() {
    this.spinnerService.show();
    this.adminService.getUnlistedEmployees().subscribe((data) => {
      this.spinnerService.hide();
      this.managerList = data.result.managers;
      this.developerList = data.result.developers;
    });
  }

  closeTeamModal() {
    this.addTeamModal = false;
    this.modalService.closeModal();
  }
  OpenTeamModal() {
    this.addTeamModal = true;
    this.modalService.openModal();
  }
  selectTeam(teamId: any) {
    var teamIdStr = String(teamId);
    this.adminService.getTeamMembersData(teamIdStr).subscribe((response) => {
      this.teamDetails = response.result;
    });
  }

  AddTeam() {
    console.log(this.AddTeamData);
  }
}
