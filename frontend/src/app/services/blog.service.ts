import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BlogPost } from '../models/blog-post.model';
import { Observable, catchError, throwError } from 'rxjs';
import { BlogPostCreate } from "../models/blog-post-create.model";

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

  createPost(post: BlogPostCreate): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.apiUrl}/posts`, post);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.status === 400 && error.error.errors) {
      errorMessage = Object.values(error.error.errors).join(', ');
    } else if (error.status === 404) {
      errorMessage = 'Post not found';
    } else if (error.status === 403) {
      errorMessage = 'Unauthorized';
    }
    return throwError(() => new Error(errorMessage));
  }
}
