import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import Post from '../models/post.model';
import Comment, { EditComment } from '../models/comment.model';
import { MessageService } from './message.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAuthState } from '../store/auth/interface';

const baseUrl = 'http://localhost:4000/posts';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  public auth$!: Observable<{ auth: IAuthState; }>;
  auth: boolean | undefined;

  constructor(
    private http: HttpClient, 
    private messageService: MessageService, 
    private store: Store<{ auth: IAuthState }>, 
    private route: ActivatedRoute
  ) {  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAll(limit: number = 10, page: number = 1): Observable<Post[]> {
    limit = Number(this.route.snapshot.queryParamMap.get('limit'));
    page = Number(this.route.snapshot.queryParamMap.get('page'));
    const params = new HttpParams().set('limit', limit).set('page', page);
    return this.http.get<Post[]>(baseUrl, { params: params }).pipe(
      tap(_ => this.log('fetched posts')),
      catchError(this.handleError<Post[]>('getPosts', []))
    );
  }

  getPost(id: string | number): Observable<Post> {
    return this.http.get(`${baseUrl}/${id}`, this.jwt()).pipe(
      tap(_ => this.log(`fetched post id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(baseUrl, post, this.jwt()).pipe(
      tap((newPost: Post) => this.log(`added post w/ id=${newPost._id}`)),
      catchError(this.handleError<Post>('addPost'))
    );
  }

  updatePost(id: string | number | undefined, post: Post): Observable<Post> {
    return this.http.put<Post>(`${baseUrl}/${id}`, post, this.jwt()).pipe(
      tap(_ => this.log(`updated post w/ id=${id}`)),
      catchError(this.handleError<any>('updatePost'))
    );
  }

  deletePost(id: string | number | undefined): Observable<Post> {
    return this.http.delete<Post>(`${baseUrl}/${id}`, this.jwt()).pipe(
      tap(_ => this.log(`deleted post id=${id}`)),
      catchError(this.handleError<Post>('deletePost'))
    );
  }

  // comments
  createComment(id: any, body: Comment) {
    return this.http.post(`${baseUrl}/${id}/comments`, body, this.jwt()).pipe(
      tap(_ => this.log(`fetched comment id=${id}`)),
      catchError(this.handleError<Post>(`createComment id=${id}`))
    );
  }

  editComment(postId: string | number | undefined, commentId: any, comment: EditComment ) {
    return this.http.put<Comment>(`${baseUrl}/${postId}/comments/${commentId}`, comment, this.jwt()).pipe(
      tap(_ => this.log(`updated comment w/ id=${commentId}`)),
      catchError(this.handleError<any>('updateComment'))
    );
  }

  deleteComment(postId: any, commentId: string | number | undefined) {
    return this.http.delete(`${baseUrl}/${postId}/comments/${commentId}`, this.jwt()).pipe(
      tap(_ => this.log(`fetched comment id=${postId}`)),
      catchError(this.handleError<Post>(`deleteComment id=${commentId}`))
    ).subscribe(() => console.log('Delete successful'));
  }

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
}
