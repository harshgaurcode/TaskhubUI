import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './SharedComponents/shared.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [SharedComponent, NotFoundComponent],
  imports: [CommonModule],
  exports: [],
})
export class SharedModule {}
