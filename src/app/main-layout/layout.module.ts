import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { MainLayoutRouting } from './main-layout.routing';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProjectComponent,
    UserChatComponent,
    HomeComponent,
    ProfileComponent,
    NotificationComponent,
  ],
  imports: [CommonModule, MainLayoutRouting, RouterModule],
})
export class LayoutModule {}
