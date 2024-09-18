import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { MainLayoutRouting } from './layout-routing.module';
import { MainLayoutComponent } from './Root-Page/main-layout.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    NotificationComponent,
    MainLayoutComponent,
    AdminComponent,
  ],
  imports: [CommonModule, MainLayoutRouting, HttpClientModule, FormsModule],
})
export class LayoutModule {}
