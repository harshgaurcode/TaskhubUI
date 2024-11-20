import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminPagesComponent } from './pages/admin-pages/admin-pages.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RoleComponent } from './pages/admin-pages/role/role.component';
import { UsersComponent } from './pages/admin-pages/users/users.component';
import { TeamComponent } from './pages/admin-pages/team/team.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminPagesComponent,
    AdminComponent,
    RoleComponent,
    UsersComponent,
    TeamComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, FormsModule],
})
export class AdminModule {}
