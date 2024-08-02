import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { MainLayoutRouting } from './layout-routing.module';
import { Router, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  declarations: [
    ProjectComponent,
    UserChatComponent,
    HomeComponent,
    ProfileComponent,
    NotificationComponent,
    MainLayoutComponent,
  ],
  imports: [CommonModule, MainLayoutRouting],
})
export class LayoutModule {}
