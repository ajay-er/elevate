import { createAction, props } from '@ngrx/store';
import { Tab } from 'src/app/shared/types';
import { ICurrentUser } from './auth.reducer';

export const ToogleAuthTab = createAction(
  '[Auth] Toggle Current Tab',
  props<{ currentAuthTab: Tab }>()
);

export const SetCurrentUser = createAction(
  '[Auth] Set Current User',
  props<{ currentUser: ICurrentUser }>()
);

export const UnsetCurrentUser = createAction('[Auth] Unset Current User');

export const SetUserLoggedInFalse = createAction('[Auth] SetUserLoggedInFalse');

export const SetUserLoggedInTrue = createAction('[Auth] SetUserLoggedInTrue');

export const CheckLocalStorageAction = createAction('[Auth] Check User LocalSession');

export const ClearLocalStorageAction = createAction('[Auth] Clear User LocalSession');

export const LogoutSuccess = createAction('[Auth] LogoutSuccess');

export const GetLocalStorageData = createAction(
  '[Auth] Get LocalSession',
  props<{ currentUser: ICurrentUser }>()
);
