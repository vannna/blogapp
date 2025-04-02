import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Comment } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  constructor(private http: HttpClient) {}

  getComments(postId: number) {
    return this.http.get<Comment[]>(`${environment.apiUrl}/posts/${postId}/comments`);
  }

  addComment(postId: number, content: string) {
    return this.http.post<Comment>(`${environment.apiUrl}/posts/${postId}/comments`, { content });
  }
}
