import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainlayoutService {
  constructor(private http: HttpClient) {}
  quoteApi(): Observable<any> {
    return this.http.get(
      'https://api.api-ninjas.com/v1/quotes?category=inspirational'
    );
  }
}
