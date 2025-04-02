import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { CommentService } from '../../services/comment.service';
import { BlogPost } from '../../models/blog-post.model';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PostDetailComponent implements OnInit {
  post: BlogPost | null = null;
  comments: Comment[] = [];
  newComment = '';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private commentService: CommentService
  ) {}

  loadComments() {
    if (!this.post) return;
    this.commentService.getComments(this.post.id).subscribe((data: Comment[]) => {
      this.comments = data;
    });
  }

  addComment() {
    if (!this.post) return;
    const commentDto = { content: this.newComment };
    this.commentService.addComment(this.post.id, commentDto)
      .subscribe({
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
    this.blogService.getPostById(id).subscribe(post => {
      this.post = post;
      this.loadComments();
    });
  }
}
