import { Component } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent {
  isLoading: boolean = false;
  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.isLoading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
}
