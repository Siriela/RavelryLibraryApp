import { Injectable, Input, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';

import { Pattern, User } from './pattern.model';
import { ErrorService } from '../shared/error.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private errorService = inject(ErrorService);
  private httpClient = inject(HttpClient);
  patterns = signal<Pattern[]>([]);
  currentUser = signal<User>({});
  accessToken = localStorage.getItem("access_token");
  route: ActivatedRoute;
  
  constructor (route:  ActivatedRoute) {
    this.route = route;
  }   
  
  loadCurrentUser() {
    return this.fetchCurrentUser(
      'https://api.ravelry.com/current_user.json',
      'loadPatterns: Something went wrong fetching the available places. Please try again later.'
    ).pipe(
      tap({
        next: (currentUser) => this.currentUser.set(currentUser),
      })
    );
  }

  loadPatterns() {
    return this.fetchPatterns(
      'https://api.ravelry.com/people/' + this.currentUser().username + '/library/search.json',
      'loadPatterns: Something went wrong fetching the available places. Please try again later.'
    ).pipe(
      tap({
        next: (patterns) => this.patterns.set(patterns),
      })
    );
  }
  
  private fetchPatterns(url: string, errorMessage: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
        
    return this.httpClient.get<{ volumes: Pattern[] }>(url, { headers }).pipe(
      map((resData) => resData.volumes),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  private fetchCurrentUser(url: string, errorMessage: string) { 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
    
    return this.httpClient.get<{ user: User }>(url, { headers }).pipe(
      map((resData) => resData.user),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
