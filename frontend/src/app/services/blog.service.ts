import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BlogPost } from '../models/blog-post.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  constructor(private http: HttpClient) {}

  getAllPosts() {
    return this.http.get<BlogPost[]>(`${environment.apiUrl}/posts`);
  }

  getPostById(id: number) {
    return this.http.get<BlogPost>(`${environment.apiUrl}/posts/${id}`);
  }

  createPost(post: { title: string, content: string }) {
    return this.http.post<BlogPost>(`${environment.apiUrl}/posts`, post);
  }
}
