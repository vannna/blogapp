import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError, throwError } from "rxjs";
import { BlogPostCreate } from "../../models/blog-post-create.model";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class PostCreateComponent {
  post: BlogPostCreate = {
    title: '',
    content: ''
  };

  constructor(private blogService: BlogService, private router: Router) {}

  onSubmit() {
    this.blogService.createPost(this.post).pipe(
      catchError((error) => {
        alert(error.message);
        return throwError(() => error);
      })
    ).subscribe({
      next: (newPost) => this.router.navigate(['/posts', newPost.id]),
      error: (err) => alert(err.message)
    });
  }
}
