import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectKanbanComponent } from './project-kanban/project-kanban.component';
import { ProjectComponent } from './Project-Root/project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      { path: 'project-dashboard', component: ProjectDashboardComponent },
      { path: 'board', component: ProjectKanbanComponent },
      { path: '', redirectTo: 'project-dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
