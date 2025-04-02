import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class PostCreateComponent {
  post = { title: '', content: '' };

  constructor(private blogService: BlogService, private router: Router) {}

  onSubmit() {
    this.blogService.createPost(this.post).subscribe({
      next: (newPost) => this.router.navigate(['/posts', newPost.id]),
      error: (err) => alert('Error creating post')
    });
  }
}
