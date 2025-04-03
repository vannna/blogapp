import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import { Comment } from '../../models/comment.model';
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CommentListComponent implements OnInit {
  @Input() postId!: number;
  comments: Comment[] = [];

  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.postId) {
      this.commentService.getComments(this.postId).subscribe({
        next: (data: Comment[]) => this.comments = data,
        error: (err) => alert('Failed to load comments')
      });
    } else {
      console.error('Post ID is required');
    }
  }

  deleteComment(commentId: number) {
    if (confirm('Are you sure?')) {
      this.commentService.deleteComment(this.postId, commentId).pipe(
        catchError((error) => {
          alert('Failed to delete comment');
          return throwError(() => error);
        })
      ).subscribe(() => {
        this.comments = this.comments.filter(c => c.id !== commentId);
      });
    }
  }

  isCurrentUserAuthorOfComment(comment: Comment): boolean {
    const user = this.authService.getCurrentUser();
    return comment.authorUsername === user?.username;
  }
}
