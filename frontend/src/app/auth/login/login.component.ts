import { Component } from '@angular/core';
import { AuthService, LoginCredentials, AuthResponse } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  credentials: LoginCredentials = { username: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.credentials).subscribe({
      next: (response: AuthResponse) => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify({
          username: response.user.username,
          role: response.user.role
        }));
        this.router.navigate(['/']);
      },
      error: (err) => alert('Login failed')
    });
  }
}
