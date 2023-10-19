import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export interface State {
  auth: AuthState;
}

//selecters
const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

//selecting each data from the slice
export const getCurrentPage = createSelector(
  getAuthFeatureState,
  (state) => {
    return state.currentAuthPage;
  }
);
