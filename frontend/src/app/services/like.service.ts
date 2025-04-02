import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Like } from '../models/like.model';

@Injectable({ providedIn: 'root' })
export class LikeService {
  constructor(private http: HttpClient) {}

  toggleLike(postId: number) {
    return this.http.post<Like>(`${environment.apiUrl}/posts/${postId}/likes`, {});
  }

  checkLike(postId: number) {
    return this.http.get<boolean>(`${environment.apiUrl}/posts/${postId}/likes/check`);
  }
}
