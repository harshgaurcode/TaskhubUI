import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { SpinnerComponent } from './spinner/spinner/spinner.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [NotFoundComponent, SpinnerComponent, ModalComponent],
  imports: [CommonModule],
  exports: [SpinnerComponent, ModalComponent],
})
export class SharedModule {}
