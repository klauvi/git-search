import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResult } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  API_URL = 'https://api.github.com/search/users';
  constructor(private http: HttpClient) {}

  getUsers(q: string, perPage: string, page: string): Observable<SearchResult> {
    const params = {
      q,
      page,
      per_page: perPage
    };
    return this.http.get<SearchResult>(this.API_URL, { params });
  }
}
