import { createAction, props } from '@ngrx/store';
import { Tab } from 'src/app/shared/types';
import { ICurrentUser } from './auth.reducer';

export const ToogleAuthTab = createAction(
  '[Auth Page] Toggle Current Tab',
  props<{ currentAuthTab: Tab }>()
);

export const SetCurrentUser = createAction(
  '[Auth] Set Current User',
  props<{ currentUser: ICurrentUser }>()
);

export const UnsetCurrentUser = createAction('[Auth] Unset Current User');

export const SetUserLoggedIn = createAction('[Auth] Set User LoggedIn');

export const GetLocalStorageData = createAction(
  '[Auth] Get LocalSession',
  props<{ currentUser: ICurrentUser }>()
);
