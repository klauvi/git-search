import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResult, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  API_URL = 'https://api.github.com';
  constructor(private http: HttpClient) {}

  getUsers(q: string, perPage: string, page: string): Observable<SearchResult> {
    const params = {
      q,
      page,
      per_page: perPage
    };
    return this.http.get<SearchResult>(`${this.API_URL}/search/users`, { params });
  }
  getUser(login: string): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/users/${login}`);
  }
}
