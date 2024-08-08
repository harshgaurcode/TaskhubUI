import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor() {}
  popupVisibility = new BehaviorSubject<boolean>(false);
  popupVisibility$ = this.popupVisibility.asObservable();

  showPopup(): void {
    this.popupVisibility.next(true);
  }

  hidePopup(): void {
    this.popupVisibility.next(false);
  }
}
