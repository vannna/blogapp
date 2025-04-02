import { Component, Input, OnInit } from '@angular/core';
import { LikeService } from '../../services/like.service';

@Component({
  selector: 'app-like-button',
  template: `
    <button (click)="toggleLike()">
      {{ isLiked ? 'Unlike' : 'Like' }}
    </button>
  `,
  standalone: true
})
export class LikeButtonComponent implements OnInit {
  @Input() postId!: number;
  isLiked = false;

  constructor(private likeService: LikeService) {}

  ngOnInit() {
    this.likeService.checkLike(this.postId).subscribe(
      isLiked => this.isLiked = isLiked
    );
  }

  toggleLike() {
    this.likeService.toggleLike(this.postId).subscribe(() => {
      this.isLiked = !this.isLiked;
    });
  }
}
