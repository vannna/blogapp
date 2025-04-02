import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; // Correct import
import { BlogService } from '../../services/blog.service';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import { BlogPost } from '../../models/blog-post.model';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink] // Ensure RouterLink is imported [[2]]
})
export class PostDetailComponent implements OnInit {
  post: BlogPost | null = null;
  comments: Comment[] = [];
  newComment = '';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private commentService: CommentService,
    private router: Router,
    private authService: AuthService
  ) {}

  loadComments() {
    if (!this.post) return;
    this.commentService.getComments(this.post.id).subscribe({
      next: (data: Comment[]) => this.comments = data,
      error: (err) => alert(err.message)
    });
  }

  addComment() {
    if (!this.post) return;
    const commentDto = { content: this.newComment };
    this.commentService.addComment(this.post.id, commentDto).subscribe({
      next: (comment) => {
        this.comments.push(comment);
        this.newComment = '';
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

  deletePost() {
    if (confirm('Are you sure?')) {
      this.blogService.deletePost(this.post!.id).subscribe({
        next: () => {
          this.router.navigate(['/posts']).then(() => {}); // Explicitly handle promise [[6]]
        },
        error: (err) => alert(err.message)
      });
    }
  }

  isCurrentUserAuthor(): boolean {
    const currentUser = this.authService.getCurrentUser();
    const userRole = this.authService.getCurrentUserRole();
    return (
      this.post?.authorUsername === currentUser?.username ||
      userRole === 'ROLE_ADMIN'
    );
  }

  isCurrentUserAuthorOfComment(comment: Comment): boolean {
    const user = this.authService.getCurrentUser();
    return comment.authorUsername === user?.username;
  }

  deleteComment(commentId: number) {
    if (confirm('Are you sure?')) {
      this.commentService.deleteComment(this.post!.id, commentId).subscribe(() => {
        this.comments = this.comments.filter(comment => comment.id !== commentId);
      });
    }
  }
}
