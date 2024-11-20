import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ModalComponent } from './modal/modal.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NotFoundComponent, SpinnerComponent, ModalComponent],
  imports: [CommonModule, ToastrModule, FormsModule],
  exports: [SpinnerComponent, ModalComponent],
})
export class SharedModule {}
