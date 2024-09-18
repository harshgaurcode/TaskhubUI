import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectKanbanComponent } from './project-kanban/project-kanban.component';
import { ProjectRoutingModule } from './project-routing.module';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from './Project-Root/project.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
  ],
  providers: [],
})
export class ProjectModule {}
