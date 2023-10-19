import { createReducer, on } from '@ngrx/store';
import {
  selectForgotPage,
  selectLoginPage,
  selectSignupPage,
} from './auth.action';
import { CurrentPage } from 'src/app/shared/types/currentPage';

export interface AuthState {
  currentAuthPage: CurrentPage;
}

const initialState: AuthState = {
  currentAuthPage: 'login',
};

export const authReducer = createReducer(
  initialState,
  on(selectLoginPage, (state, action): AuthState => {
    return { ...state, currentAuthPage: action.currentAuthPage };
  }),
  on(selectSignupPage, (state, action) => {
    return { ...state, currentAuthPage: action.currentAuthPage };
  }),
  on(selectForgotPage, (state, action) => {
    return { ...state, currentAuthPage: action.currentAuthPage };
  })
);
