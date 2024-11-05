import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectKanbanComponent } from './project-kanban/project-kanban.component';
import { ProjectRoutingModule } from './project-routing.module';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from './project-root-component/project.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ModalComponent } from '../../shared/modal/modal.component';

@NgModule({
  declarations: [
    ProjectDashboardComponent,
    ProjectKanbanComponent,
    ProjectComponent,
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
  ],
  providers: [],
})
export class ProjectModule {}
