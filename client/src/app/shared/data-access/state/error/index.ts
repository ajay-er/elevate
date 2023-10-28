import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ErrorState } from './error.reducer';

export interface State {
  error: ErrorState;
}

//selecters
const getErrorFeatureState = createFeatureSelector<ErrorState>('error');

//selecting each data from the slice
export const GetError = createSelector(getErrorFeatureState, (state) => {
  return state;
});
