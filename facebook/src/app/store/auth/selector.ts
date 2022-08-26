import { createSelector } from '@ngrx/store';
import { IAuthState } from './interface';

export interface AppState {
  feature: IAuthState;
}

export const selectFeature = (state: AppState) => state.feature;

export const selectFeatureCount = createSelector(
  selectFeature,
  (state: IAuthState) => state.isAuthenticated
);
