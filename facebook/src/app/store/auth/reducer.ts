import { Action, createReducer, on } from '@ngrx/store';
import { SignIn, SignOut } from './actions';
import { IAuthState } from './interface';

export const initialState: IAuthState = { isAuthenticated: false, token: '' };

const _authReducer = createReducer(
  initialState,
  on(SignIn, (state, { token }) => {
    return { ...state, isAuthenticated: true, token };
  }),
  on(SignOut, (state) => {
    return { ...state, ...initialState };
  })
);


export function authReducer(state: IAuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
