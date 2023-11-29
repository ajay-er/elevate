import { createAction, props } from '@ngrx/store';
import { Tab } from 'src/app/shared/types';
import { ICurrentUser } from './auth.reducer';

export const ToogleAuthTab = createAction(
  '[Auth] Toggle Current Tab',
  props<{ currentAuthTab: Tab }>()
);

export const SetAccessToken = createAction(
  '[Auth] Save Token In Local Store',
  props<{ accessToken: string; tokenType: 'access_token' }>()
);

export const UnsetCurrentUser = createAction('[Auth] Unset Current User');

export const ToggleFounderLoggedIn = createAction(
  '[Auth] Toggle Founder LoggedIn',
  props<{ isFounderLoggedIn: boolean }>()
);

export const ToggleInvestorLoggedIn = createAction(
  '[Auth] Toggle Investor LoggedIn',
  props<{ isInvestorLoggedIn: boolean }>()
);

export const CheckLocalStorageAction = createAction(
  '[Auth] Check User LocalSession'
);

export const ClearLocalStorageAction = createAction(
  '[Auth] Clear User LocalSession'
);

export const LogoutSuccess = createAction('[Auth] LogoutSuccess');

export const LogoutFailer = createAction('[Auth] LogoutFailer');

export const SetCurrentUser = createAction(
  '[Auth] Set Current User',
  props<{
    currentUser: ICurrentUser;
    isInvestorLoggedIn: boolean;
    isFounderLoggedIn: boolean;
  }>()
);
