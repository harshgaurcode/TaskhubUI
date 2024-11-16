import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private baseUrl = 'https://localhost:7054';
  MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB in bytes
  ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];
  constructor() {}

  //Show Image
  getFullImageUrl(imagePath: string): string {
    if (imagePath) {
      const removeWWWroot = imagePath.replace('/wwwroot', '');
      return `${this.baseUrl}${removeWWWroot}`;
    }
    return '';
  }

  //For File handling
  onFileChange(event: any, type: string, callback: (file: File) => void): void {
    const file = event.target.files[0];

    if (file) {
      // Validate file size
      if (file.size > this.MAX_FILE_SIZE) {
        alert('File size exceeds 1 MB. Please upload a smaller image.');
        event.target.value = ''; // Clear the file input
        return;
      }

      // Validate file type
      if (!this.ALLOWED_FILE_TYPES.includes(file.type)) {
        alert('Invalid file format. Please upload a JPG or PNG image.');
        event.target.value = ''; // Clear the file input
        return;
      }

      // Invoke the callback with the file if it's valid
      callback(file);
    }
  }
}
