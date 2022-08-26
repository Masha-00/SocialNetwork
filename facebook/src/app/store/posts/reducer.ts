import { createReducer, on } from '@ngrx/store';
import { addPost, deletePost, loadPost, loadPostsSuccess, loadPostsFailure, updatePost } from './actions';
import Post from 'src/app/models/post.model';

export interface PostState {
  posts: TPost;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export interface TPost {
  docs: Post[] | Array<Object>;
  pages: number | null;
  page: string | null;
  total: number | null;
  limit: string | null;
}
export const initialState: PostState = {
  posts: {
    docs: [],
    pages: null,
    page: null,
    total: null,
    limit: null,
  },
  error: null,
  status: 'pending',
};

export const postReducer = createReducer(
  initialState,
  on(deletePost, (state, { id }) => ({
    ...state,
  })),
  // on(updatePost, (state, { id } ) => ({
  //   ...state,
  // })),
  on(loadPost, (state) => ({ ...state, status: 'loading' })),
  on(loadPostsSuccess, (state, { posts }) => ({
    ...state,
    posts: posts,
    error: null,
    status: 'success',
  })),
  on(loadPostsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);