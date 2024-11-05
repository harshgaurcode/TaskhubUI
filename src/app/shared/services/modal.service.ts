import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}
  private modalState = new BehaviorSubject<{
    isOpen: boolean;
    type: string | null;
  }>({ isOpen: false, type: null });
  modalOpen$ = this.modalState.asObservable();

  openModal() {
    this.modalState.next({ isOpen: true, type: 'modal' });
  }

  closeModal() {
    this.modalState.next({ isOpen: false, type: null });
  }
}
