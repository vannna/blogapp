import { Component, Input } from '@angular/core';
import { LikeService } from '../../services/like.service';

@Component({
  selector: 'app-like-button',
  template: `
    <button (click)="toggleLike()">
      {{ isLiked ? 'Unlike' : 'Like' }}
    </button>
  `
})
export class LikeButtonComponent {
  @Input() postId!: number;
  isLiked = false;

  constructor(private likeService: LikeService) {}

  toggleLike() {
    this.likeService.toggleLike(this.postId).subscribe(() => {
      this.isLiked = !this.isLiked;
    });
  }
}
