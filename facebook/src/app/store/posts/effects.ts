import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadPost, loadPostsSuccess, loadPostsFailure } from './actions';
import { of, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { PostsService } from 'src/app/services/posts.service';
import Post from 'src/app/models/post.model';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<{ posts: Post }>,
    private postService: PostsService
  ) {}

  loadPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPost),
      switchMap(() =>
        from(this.postService.getAll()).pipe(
          map((post: any) => loadPostsSuccess({ posts: post })),
          catchError((error) => of(loadPostsFailure({ error })))
        )
      )
    )
  );
}
