import { Component, Input, OnInit } from '@angular/core';
import { LikeService } from '../../services/like.service';
import { catchError, throwError } from 'rxjs';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class LikeButtonComponent implements OnInit {
  @Input() postId!: number;
  isLiked = false;
  likeCount = 0;

  constructor(private likeService: LikeService) {}

  ngOnInit() {
    this.likeService.hasUserLikedPost(this.postId).pipe(
      catchError((error) => {
        alert('Failed to load like status');
        return throwError(() => error);
      })
    ).subscribe({
      next: (isLiked: boolean) => this.isLiked = isLiked,
      error: () => alert('Like status loading failed')
    });

    this.likeService.getLikeCount(this.postId).subscribe({
      next: (count: number) => this.likeCount = count,
      error: () => alert('Failed to load like count')
    });
  }

  toggleLike() {
    this.likeService.toggleLike(this.postId).pipe(
      catchError((error) => {
        alert('Failed to toggle like');
        return throwError(() => error);
      })
    ).subscribe({
      next: () => {
        this.isLiked = !this.isLiked;
        this.likeService.getLikeCount(this.postId).subscribe({
          next: (count: number) => this.likeCount = count,
          error: () => alert('Failed to update like count')
        });
      },
      error: () => alert('Toggle failed')
    });
  }
}
