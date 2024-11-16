import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  setTokenData(token: string): void {
    try {
      const decodedToken: any = jwtDecode(token);
      localStorage.setItem('UserId', decodedToken.UserId);
      localStorage.setItem('Role', decodedToken.Role);
      localStorage.setItem('Token', token); // Store the raw token if needed
    } catch (error) {
      console.error('Error decoding token', error);
    }
  }

  // Get UserId from localStorage
  getUserId(): string | null {
    return localStorage.getItem('UserId');
  }

  // Get Role from localStorage
  getRole(): string | null {
    return localStorage.getItem('Role');
  }

  // Get raw token from localStorage
  getToken(): string | null {
    return localStorage.getItem('Token');
  }

  // Optionally, you can clear token data from localStorage
  logout(): void {
    localStorage.clear();
  }
}
