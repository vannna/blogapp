import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BlogPost } from '../models/blog-post.model';
import { Observable, catchError, throwError } from 'rxjs';

interface CreatePostDTO {
  title: string;
  content: string;
}

interface UpdatePostDTO extends CreatePostDTO {
  id: number;
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly apiUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getPostById(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createPost(post: CreatePostDTO): Observable<BlogPost> {
    return this.http.post<BlogPost>(this.apiUrl, post).pipe(
      catchError(this.handleError)
    );
  }

  updatePost(id: number, post: UpdatePostDTO): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.apiUrl}/${id}`, post).pipe(
      catchError(this.handleError)
    );
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
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
