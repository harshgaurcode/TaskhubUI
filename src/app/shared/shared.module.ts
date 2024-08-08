import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './SharedComponents/shared.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PopupsComponent } from './popups/popups.component';

@NgModule({
  declarations: [SharedComponent, NotFoundComponent, PopupsComponent],
  imports: [CommonModule],
  exports: [PopupsComponent],
})
export class SharedModule {}
