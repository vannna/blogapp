// edit-post.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { BlogPostUpdate } from '../../models/blog-post-update.model';
import { catchError, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class EditPostComponent implements OnInit {
  post: BlogPost | null = null;
  private postId!: number;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.postId = +this.route.snapshot.params['id'];
    this.blogService.getPostById(this.postId).subscribe({
      next: (post) => this.post = post,
      error: (err) => alert(err.message)
    });
  }

  onSubmit() {
    if (!this.post) return;
    const updatedPost: BlogPostUpdate = {
      title: this.post.title,
      content: this.post.content
    };

    this.blogService.updatePost(this.postId, updatedPost).pipe(
      catchError((error) => {
        alert(error.message);
        return throwError(() => error);
      })
    ).subscribe({
      next: () => {
        this.router.navigate(['/posts', this.postId]).then(() => {}); // Handle promise [[7]]
      }
    });
  }
}
