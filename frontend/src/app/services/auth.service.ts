import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError, tap } from 'rxjs';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  role: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
        tap(response => this.handleAuthResponse(response)),
        catchError(err => {
          if (err.status === 401) {
            return throwError(() => new Error('Invalid username or password'));
          }
          return throwError(() => new Error('Login failed'));
        })
    );
  }

  register(user: RegisterUser): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, user).pipe(
        tap(response => this.handleAuthResponse(response)),
        catchError(err => {
          if (err.status === 409) {
            return throwError(() => new Error('Username or email already exists'));
          }
          return throwError(() => new Error('Registration failed'));
        })
    );
  }

  private handleAuthResponse(response: AuthResponse): void {
    localStorage.setItem('access_token', response.token);
    localStorage.setItem('user', JSON.stringify(response));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUserRole(): string | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      const user = JSON.parse(userStr);
      return user.role;
    } catch {
      return null;
    }
  }

  public getCurrentUser(): AuthResponse | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  }
}
