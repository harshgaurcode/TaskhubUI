import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminPagesComponent } from './pages/admin-pages/admin-pages.component';
import { AdminComponent } from './admin.component';
import { RoleComponent } from './pages/admin-pages/role/role.component';
import { UsersComponent } from './pages/admin-pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'login',
        component: AdminLoginComponent,
      },
      {
        path: 'dash',
        component: AdminPagesComponent,
        children: [
          {
            path: 'role',
            component: RoleComponent,
          },
          {
            path: 'users',
            component: UsersComponent,
          },
          {
            path: '',
            component: RoleComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
