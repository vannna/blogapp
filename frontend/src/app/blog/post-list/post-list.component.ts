import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LikeButtonComponent } from '../../likes/like-button/like-button.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LikeButtonComponent
  ]
})
export class PostListComponent implements OnInit {
  posts: BlogPost[] = [];

  constructor(
    private blogService: BlogService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.blogService.getAllPosts().subscribe({
      next: (posts) => this.posts = posts,
      error: (err) => alert(err.message)
    });
  }
}
