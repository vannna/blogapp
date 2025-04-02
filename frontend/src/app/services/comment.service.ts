import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Comment } from '../models/comment.model';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

interface CreateCommentDTO {
  content: string;
}

@Injectable({ providedIn: 'root' })
export class CommentService {
  private readonly apiUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {}

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${postId}/comments`).pipe(
      catchError(this.handleError)
    );
  }

  getCommentById(postId: number, commentId: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/${postId}/comments/${commentId}`).pipe(
      catchError(this.handleError)
    );
  }

  addComment(postId: number, comment: CreateCommentDTO): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/${postId}/comments`, comment).pipe(
      catchError(this.handleError)
    );
  }

  deleteComment(postId: number, commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${postId}/comments/${commentId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.status === 404) {
      errorMessage = 'Comment not found';
    } else if (error.status === 403) {
      errorMessage = 'You are not authorized to perform this action';
    }
    return throwError(() => new Error(errorMessage));
  }
}
