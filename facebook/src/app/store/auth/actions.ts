import { createAction, props } from '@ngrx/store';

export const SignIn = createAction('[AUTH] SignUp', props<{ token: string }>());
export const SignOut = createAction('[AUTH] SignOut');
