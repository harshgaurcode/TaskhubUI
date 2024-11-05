import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private isLoading = new BehaviorSubject<boolean>(false); // Default is not loading
  isLoading$ = this.isLoading.asObservable(); // Observable to be consumed in the component

  constructor() {}
  show(): void {
    this.isLoading.next(true); // Show spinner
  }

  hide(): void {
    this.isLoading.next(false); // Hide spinner
  }
}
