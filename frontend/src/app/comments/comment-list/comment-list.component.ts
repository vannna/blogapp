import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html'
})
export class CommentListComponent implements OnInit {
  @Input() postId!: number;
  comments: any[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.commentService.getComments(this.postId).subscribe(data => this.comments = data);
  }
}
