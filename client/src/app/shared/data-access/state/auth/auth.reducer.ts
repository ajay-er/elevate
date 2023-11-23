import { createReducer, on } from "@ngrx/store";
import { Tab } from "src/app/shared/types";
import {
  GetLocalStorageData,
  SetCurrentUser,
  SetUserLoggedInFalse,
  SetUserLoggedInTrue,
  ToogleAuthTab,
  UnsetCurrentUser,
} from "./auth.action";

export interface ICurrentUser {
  name: string;
  photo?: string;
  email: string;
  isEmailVerified: boolean;
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
    name: "",
    photo: "",
    email: "",
    isEmailVerified: false,
  },
};

export const authReducer = createReducer(
  initialState,
  on(ToogleAuthTab, (state, action): AuthState => {
    return { ...state, currentAuthTab: action.currentAuthTab };
  }),
  on(SetUserLoggedInFalse, (state): AuthState => {
    return { ...state, isUserLoggedIn: false };
  }),
  on(SetUserLoggedInTrue, (state): AuthState => {
    return { ...state, isUserLoggedIn: true };
  }),
  on(SetCurrentUser, (state, action): AuthState => {
    return { ...state, currentUser: action.currentUser, isUserLoggedIn: action.currentUser.isEmailVerified };
  }),
  on(UnsetCurrentUser, (state): AuthState => {
    return {
      ...state,
      currentUser: {
        name: "",
        photo: "",
        email: "",
        isEmailVerified: false,
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
        isEmailVerified: action.currentUser.isEmailVerified,
      },
    };
  })
);
