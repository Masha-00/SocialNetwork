import { createAction, props } from '@ngrx/store';
import { TPost } from './reducer';

export const addPost = createAction(
  '[Post Page] Add Post',
  props<{ content: string }>()
);

export const updatePost = createAction(
  '[Post Page] Update Post',
  props<{ id: string | number, content: string }>(),
)

export const deletePost = createAction(
  '[Post Page] Remove Post',
  props<{ id: string }>()
);

export const loadPost = createAction('[Post Page] Load Post');

export const loadPostsSuccess = createAction(
  '[Post API] Post Load Success',
  props<{ posts: TPost }>()
);

export const loadPostsFailure = createAction(
  '[Post API] Post Load Failure',
  props<{ error: string }>()
);
