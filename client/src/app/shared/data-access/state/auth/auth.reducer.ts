import { createReducer, on } from '@ngrx/store';
import { IRole, Tab } from 'src/app/shared/types';
import {
  SetCurrentUser,
  ToggleFounderLoggedIn,
  ToggleInvestorLoggedIn,
  ToogleAuthTab,
  UnsetCurrentUser,
} from './auth.action';

export interface ICurrentUser {
  name: string;
  photo?: string;
  email: string;
  isEmailVerified: boolean;
  role: IRole | null;
}
export interface AuthState {
  currentAuthTab: Tab;
  isFounderLoggedIn: boolean;
  isInvestorLoggedIn: boolean;
  currentUser: ICurrentUser;
}

const initialState: AuthState = {
  currentAuthTab: Tab.Login,
  isFounderLoggedIn: false,
  isInvestorLoggedIn: false,
  currentUser: {
    name: '',
    photo: '',
    email: '',
    isEmailVerified: false,
    role: null,
  },
};

export const authReducer = createReducer(
  initialState,
  on(ToogleAuthTab, (state, action): AuthState => {
    return { ...state, currentAuthTab: action.currentAuthTab };
  }),
  on(ToggleFounderLoggedIn, (state, action): AuthState => {
    return { ...state, isFounderLoggedIn: !action.isFounderLoggedIn };
  }),
  on(ToggleInvestorLoggedIn, (state, action): AuthState => {
    return { ...state, isInvestorLoggedIn: !action.isInvestorLoggedIn };
  }),
  on(UnsetCurrentUser, (state): AuthState => {
    return {
      ...state,
      currentUser: {
        name: '',
        photo: '',
        email: '',
        isEmailVerified: false,
        role: null,
      },
      isFounderLoggedIn: false,
      isInvestorLoggedIn: false,
    };
  }),
  on(SetCurrentUser, (state, action): AuthState => {
    return {
      ...state,
      currentUser: {
        name: action.currentUser.name,
        photo: action.currentUser?.photo,
        email: action.currentUser.email,
        isEmailVerified: action.currentUser.isEmailVerified,
        role: action.currentUser.role,
      },
      isFounderLoggedIn: action.isFounderLoggedIn,
      isInvestorLoggedIn: action.isInvestorLoggedIn,
    };
  })
);
