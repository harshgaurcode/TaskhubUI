import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'project',
        component: ProjectComponent,
      },
      {
        path: 'chats',
        component: UserChatComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'notification',
        component: NotificationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutRouting {}
