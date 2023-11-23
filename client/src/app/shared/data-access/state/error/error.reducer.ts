import { createReducer, on } from '@ngrx/store';
import { ClearError, SetError } from './error.action';

export interface ErrorState {
  errorMessage: string | null;
  errorType: string | null;
}

const initialState: ErrorState = {
  errorMessage: null,
  errorType: null,
};

export const errorReducer = createReducer(
  initialState,
  on(SetError, (state, action): ErrorState => {
    return {
      ...state,
      errorMessage: action.errorMessage,
      errorType: action.errorType,
    };
  }),
  on(ClearError, (state): ErrorState => {
    return {
      ...state,
      errorMessage: null,
      errorType: null,
    };
  })
);
