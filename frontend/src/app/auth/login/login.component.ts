import { Component } from '@angular/core';
import { AuthService, LoginCredentials } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class LoginComponent {
  credentials: LoginCredentials = { username: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/']).then(() => {});      },
      error: (err) => alert(err.message)
    });
  }
}
