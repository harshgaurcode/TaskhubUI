import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { MainLayoutComponent } from './Root-Page/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'project',
        loadChildren: () =>
          import('./project/project.module').then((m) => m.ProjectModule),
      },
      {
        path: 'chats',
        loadChildren: () =>
          import('./user-chat/chat-module.module').then(
            (m) => m.ChatModuleModule
          ),
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'notification',
        component: NotificationComponent,
      },
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutRouting {}
