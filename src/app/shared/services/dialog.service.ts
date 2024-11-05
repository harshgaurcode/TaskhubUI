import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private modalService: NgbModal, private router: Router) {}

  confirm(
    message: string,
    confirmButtonText: string = 'Yes',
    cancelButtonText: string = 'Cancel'
  ): Promise<boolean> {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.confirmButtonText = confirmButtonText;
    modalRef.componentInstance.cancelButtonText = cancelButtonText;
    return modalRef.result.catch((reason) => {
      throw reason;
    });
  }
  logout() {
    this.confirm('Are you sure you want to log out?', 'Logout', 'Cancel')
      .then((confirmed) => {
        if (confirmed) {
          localStorage.removeItem('Token');
          localStorage.removeItem('User');
          this.router.navigateByUrl('auth'); // Assuming you have 'router' injected here
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}
