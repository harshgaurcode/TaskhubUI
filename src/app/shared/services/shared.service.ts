import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

import { Toast } from 'bootstrap';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private baseUrl = 'https://localhost:7054';
  constructor() {}

  //Show Image
  getFullImageUrl(imagePath: string): string {
    return `${this.baseUrl}${imagePath}`;
  }

  showToast(message: string, type: 'success' | 'error' = 'error'): void {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast align-items-center  border-0`;
    toast.role = 'alert';
    toast.ariaLive = 'assertive';
    toast.ariaAtomic = 'true';
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    // Append toast to the body
    document.body.appendChild(toast);

    // Initialize and show toast

    const toastElement = new Toast(toast);
    toastElement.show();
    setTimeout(() => {
      console.log('waiting');
    }, 10000);
  }
}
