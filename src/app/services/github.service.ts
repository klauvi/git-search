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

  getUsers(q: string, perPage = 10, page = 1): Observable<SearchResult> {
    const params = {
      q,
      page: String(page),
      per_page: String(perPage)
    };
    return this.http.get<SearchResult>(this.API_URL, { params });
  }
}
