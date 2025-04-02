import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/comment.service';
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class CommentListComponent implements OnInit {
  @Input() postId!: number;
  comments: any[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    if (this.postId) {
      this.commentService.getComments(this.postId).pipe(
        catchError(err => {
          alert(err.message);
          return throwError(() => err);
        })
      ).subscribe(data => this.comments = data);
    }
  }
}
