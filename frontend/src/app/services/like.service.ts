import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Like } from '../models/like.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LikeService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  toggleLike(postId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/posts/${postId}/likes/toggle`, {}).pipe(
    catchError(this.handleError)
    );
  }

  hasUserLikedPost(postId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/posts/${postId}/likes/check`).pipe(
      catchError(this.handleError)
    );
  }

  getLikeCount(postId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/posts/${postId}/likes/count`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.status === 404) {
      errorMessage = 'Post not found';
    } else if (error.status === 403) {
      errorMessage = 'You are not authorized to perform this action';
    }
    return throwError(() => new Error(errorMessage));
  }
}
