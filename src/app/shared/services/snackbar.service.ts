import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private toastr: ToastrService) {}

  showsuccess(message: string, title?: string) {
    this.toastr.success(message, title, { closeButton: true, timeOut: 1000 });
  }

  showerror(message: string, title: string) {
    this.toastr.error(message, title, { closeButton: true, timeOut: 1000 });
  }

  showinfo(message: string, title: string) {
    this.toastr.info(message, title, { closeButton: true, timeOut: 500 });
  }
}
