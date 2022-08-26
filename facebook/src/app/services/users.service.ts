import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAuthState } from '../store/auth/interface';
import User from '../models/user.model';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

const baseUrl = 'http://localhost:4000/users';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public auth$!: Observable<{ auth: IAuthState; }>;
  auth: boolean | undefined;

  createNewUser(payload: any): Observable<any> {
    return this.http.post(`${baseUrl}`, payload);
  }

  userLogin(payload: any): Observable<User> {
    return this.http.post(`${baseUrl}/login`, payload);
  }

  userLogout() {
    sessionStorage.removeItem('Token');
  }

  getUser(id: string | number,): Observable<User> {
    return this.http.get(`${baseUrl}/${id}`, this.jwt()).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  changePassword(id: string | number, password: string): Observable<User> {
    return this.http.put(`${baseUrl}/${id}/change-password`, password, this.jwt()).pipe(
      tap(_ => this.log(`Changed password id=${id}`)),
      catchError(this.handleError<any>('changed password'))
    );
  }

  deleteUser(id: any): Observable<User> {
    return this.http.delete<User>(`${baseUrl}/${id}`, this.jwt()).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  updateUser(id: string | number | undefined, user: User): Observable<User> {
    return this.http.put(`${baseUrl}/${id}`, user, this.jwt()).pipe(
      tap(_ => this.log(`Update user id=${id}`)),
      catchError(this.handleError<any>('User updated'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`PostsService: ${message}`);
  }

  private jwt(): { headers: HttpHeaders } | undefined {
    let token = '';
    this.store.subscribe((state) => {
      this.auth = state.auth.isAuthenticated;
      token = state.auth.token;
    });
    return {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    };
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService, 
    private store: Store<{ auth: IAuthState }>
  ) {}
}

