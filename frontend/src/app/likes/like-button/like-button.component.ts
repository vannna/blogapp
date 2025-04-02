import { Component, Input, OnInit } from '@angular/core';
import { LikeService } from '../../services/like.service';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-like-button',
  template: `
    <button (click)="toggleLike()">
      {{ isLiked ? 'Unlike' : 'Like' }}
    </button>
    <span>{{ likeCount }} likes</span>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class LikeButtonComponent implements OnInit {
  @Input() postId!: number;
  isLiked = false;
  likeCount = 0;

  constructor(private likeService: LikeService) {}

  ngOnInit() {
    this.likeService.hasUserLikedPost(this.postId).subscribe(
      (isLiked: boolean) => this.isLiked = isLiked
    );
    this.likeService.getLikeCount(this.postId).subscribe(
      (count: number) => this.likeCount = count
    );
  }

  toggleLike() {
    this.likeService.toggleLike(this.postId).subscribe(() => {
      this.isLiked = !this.isLiked; // Toggle state
      this.likeService.getLikeCount(this.postId).subscribe(
        (count: number) => this.likeCount = count
      );
    });
  }
}
