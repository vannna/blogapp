import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { BlogPostUpdate } from '../../models/blog-post-update.model';
import { catchError, throwError } from 'rxjs';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LikeButtonComponent} from "../../likes/like-button/like-button.component";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LikeButtonComponent
  ]
})
export class EditPostComponent implements OnInit {
  post: BlogPost | null = null;
  postId!: number;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.postId = +this.route.snapshot.params['id'];
    this.blogService.getPostById(this.postId).subscribe({
      next: (post: BlogPost) => this.post = post,
      error: (err: any) => alert(err.message)
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.post) return;

    const updatedPost: BlogPostUpdate = {
      title: this.post.title,
      content: this.post.content
    };

    this.blogService.updatePost(this.postId, updatedPost).pipe(
      catchError((error: any) => {
        alert(error.message);
        return throwError(() => error);
      })
    ).subscribe({
      next: () => this.router.navigate(['/posts', this.postId]).then(() => {}),
      error: (err: any) => alert(err.message)
    });
  }

  deletePost() {
    if (confirm('Are you sure?')) {
      this.blogService.deletePost(this.postId).subscribe(() => {
        this.router.navigate(['/']).then(() => {});
      });
    }
  }
}
