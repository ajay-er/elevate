import { createReducer, on } from '@ngrx/store';
import { toogleAuthTab } from './auth.action';
import { Tab } from 'src/app/shared/types';

export interface AuthState {
  currentAuthTab: Tab;
}

const initialState: AuthState = {
  currentAuthTab: Tab.Login,
};

export const authReducer = createReducer(
  initialState,
  on(toogleAuthTab, (state, action): AuthState => {
    return { ...state, currentAuthTab: action.currentAuthTab };
  })
);
