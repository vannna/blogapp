import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthResponseDto } from '../models/auth-response.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: { username: string, password: string }) {
    return this.http.post<AuthResponseDto>(`${environment.apiUrl}/auth/login`, credentials);
  }

  register(user: { username: string, email: string, password: string }) {
    return this.http.post<AuthResponseDto>(`${environment.apiUrl}/auth/register`, user);
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getRole(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  }
}
