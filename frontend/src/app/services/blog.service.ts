import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BlogPost } from '../models/blog-post.model';
import { Observable, catchError, throwError } from 'rxjs';
import { BlogPostCreate } from "../models/blog-post-create.model";
import { BlogPostUpdate } from '../models/blog-post-update.model';


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

  createPost(post: BlogPostCreate): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.apiUrl}/posts`, post);
  }

  updatePost(id: number, post: BlogPostUpdate): Observable<BlogPost> {
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
