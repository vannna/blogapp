import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service'; // Add this
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
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
      this.commentService.getComments(this.postId).subscribe(data => this.comments = data);
    }
  }

  deleteComment(commentId: number) {
    if (confirm('Are you sure?')) {
      this.commentService.deleteComment(this.postId, commentId).subscribe(() => {
        this.comments = this.comments.filter(c => c.id !== commentId);
      });
    }
  }

  isCurrentUserAuthorOfComment(comment: Comment): boolean {
    const user = this.authService.getCurrentUser();
    return comment.authorUsername === user?.username;
  }
}
