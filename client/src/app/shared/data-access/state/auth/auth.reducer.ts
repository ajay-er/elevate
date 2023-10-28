import { createReducer, on } from '@ngrx/store';
import { Tab } from 'src/app/shared/types';
import {
  GetLocalStorageData,
  SetCurrentUser,
  SetUserLoggedInFalse,
  SetUserLoggedInTrue,
  ToogleAuthTab,
  UnsetCurrentUser,
} from './auth.action';

export interface ICurrentUser {
  name: string;
  photo?: string;
  email: string;
}
export interface AuthState {
  currentAuthTab: Tab;
  isUserLoggedIn: boolean;
  currentUser: ICurrentUser;
}

const initialState: AuthState = {
  currentAuthTab: Tab.Login,
  isUserLoggedIn: false,
  currentUser: {
    name: '',
    photo: '',
    email: '',
  },
};

export const authReducer = createReducer(
  initialState,
  on(ToogleAuthTab, (state, action): AuthState => {
    return { ...state, currentAuthTab: action.currentAuthTab };
  }),
  on(SetCurrentUser, (state, action): AuthState => {
    return { ...state, currentUser: action.currentUser, isUserLoggedIn: true };
  }),
  on(SetUserLoggedInFalse, (state): AuthState => {
    return { ...state, isUserLoggedIn: false };
  }),
  on(SetUserLoggedInTrue, (state): AuthState => {
    return { ...state, isUserLoggedIn: true };
  }),
  on(UnsetCurrentUser, (state): AuthState => {
    return {
      ...state,
      currentUser: {
        name: '',
        photo: '',
        email: '',
      },
      isUserLoggedIn: false,
    };
  }),
  on(GetLocalStorageData, (state, action): AuthState => {
    return {
      ...state,
      currentUser: {
        name: action.currentUser.name,
        photo: action.currentUser?.photo,
        email: action.currentUser.email,
      },
    };
  })
);
