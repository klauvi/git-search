import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SearchResult, User } from '../models/user.model';
import { catchError } from 'rxjs/operators';

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
    console.log(params);
    return this.http.get<SearchResult>(`${this.API_URL}/search/users`, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          console.error('Client error');
        } else {
          console.error(error.status, error.error);
        }
        return throwError('We got an error, try again later');
      })
    );
  }
  getUser(login: string): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/users/${login}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          console.error('Client error');
        } else {
          console.error(error.status, error.error);
        }
        return throwError('We got an error, try again later');
      })
    );
  }
}
