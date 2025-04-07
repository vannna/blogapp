import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogPostCreate } from '../../models/blog-post-create.model';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class PostCreateComponent {
  post: BlogPostCreate = { title: '', content: '' };
  formSubmitted = false;

  constructor(private blogService: BlogService, private router: Router) {}

  onSubmit() {
    this.formSubmitted = true;
    this.blogService.createPost(this.post).subscribe({
      next: (newPost) => this.router.navigate(['/posts', newPost.id]),
      error: (err) => alert(err.message)
    });
  }
}
