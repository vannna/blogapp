import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import { BlogPost } from '../../models/blog-post.model';
import { Comment } from '../../models/comment.model';
import { LikeButtonComponent } from "../../likes/like-button/like-button.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LikeButtonComponent
  ]
})
export class PostDetailComponent implements OnInit {
  post: BlogPost | null = null;
  comments: Comment[] = [];
  newComment = '';
  commentFormSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private commentService: CommentService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.blogService.getPostById(id).subscribe({
      next: (post) => {
        this.post = post;
        this.loadComments();
      },
      error: (err) => alert(err.message)
    });
  }

  loadComments() {
    if (!this.post) return;
    this.commentService.getComments(this.post.id).subscribe({
      next: (data: Comment[]) => this.comments = data,
      error: (err) => alert(err.message)
    });
  }

  addComment() {
    this.commentFormSubmitted = true;
    if (!this.post) return;
    const commentDto = { content: this.newComment };
    this.commentService.addComment(this.post.id, commentDto).subscribe({
      next: (comment) => {
        this.comments.push(comment);
        this.newComment = '';
        this.commentFormSubmitted = false;
      },
      error: (error) => {
        if (error.status === 403) {
          alert('Please login to comment');
        } else {
          alert('Error adding comment');
        }
      }
    });
  }

  deleteComment(commentId: number) {
    if (confirm('Are you sure?')) {
      this.commentService.deleteComment(this.post!.id, commentId).subscribe(() => {
        this.comments = this.comments.filter(c => c.id !== commentId);
      });
    }
  }

  deletePost() {
    if (confirm('Are you sure?')) {
      this.blogService.deletePost(this.post!.id).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  isCurrentUserAuthor(): boolean {
    const user = this.authService.getCurrentUser();
    const role = this.authService.getCurrentUserRole();
    return this.post?.authorUsername === user?.username || role === 'ROLE_ADMIN'; // [[3]]
  }

  isCurrentUserAuthorOfComment(comment: Comment): boolean {
    const user = this.authService.getCurrentUser();
    return comment.authorUsername === user?.username;
  }
}
