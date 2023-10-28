import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export interface State {
  auth: AuthState;
}

//selecters
const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

//selecting each data from the slice
export const toggleAuthPage = createSelector(
  getAuthFeatureState,
  (state) => {
    return state.currentAuthTab;
  }
);

export const getCurrentUserData = createSelector(
  getAuthFeatureState,
  (state) => {
    return state.currentUser;
  }
);

export const isUserLoggedIn = createSelector(
  getAuthFeatureState,
  (state) => {
    return state.isUserLoggedIn;
  }
);
