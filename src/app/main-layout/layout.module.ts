import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { MainLayoutRouting } from './layout-routing.module';
import { MainLayoutComponent } from './root/main-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    NotificationComponent,
    MainLayoutComponent,
  ],
  imports: [
    CommonModule,
    MainLayoutRouting,
    HttpClientModule,
    FormsModule,
    SharedModule,
  ],
})
export class LayoutModule {}
