import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private profileUrl = `${environment.apiUrl}/api/v1/users/profile`;

  constructor(private http: HttpClient) {}

  updateProfile(bioData: { bio?: string }): Observable<any> {
    return this.http.put(this.profileUrl, bioData);
  }
}
