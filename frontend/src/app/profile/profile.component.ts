import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { UserProfileDto } from '../models/user-profile.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProfileComponent {
  user: UserProfileDto = {
    username: '',
    email: '',
    bio: ''
  };

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user = {
        username: currentUser.username || '',
        email: currentUser.email || '',
        bio: currentUser.bio || ''
      };
    }
  }

  updateProfile() {
    const bioData = { bio: this.user.bio }; // Now bio is always a string (not undefined)
    this.profileService.updateProfile(bioData).subscribe({
      next: () => {
        this.authService.updateCurrentUser({ bio: this.user.bio });
        this.router.navigate(['/']);
      },
      error: (err) => alert(err.message)
    });
  }

}
