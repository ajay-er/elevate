import { createAction, props } from '@ngrx/store';
import { CurrentPage } from 'src/app/shared/types/currentPage';

export const selectLoginPage = createAction(
  '[Auth Page] Login page',
  props<{ currentAuthPage: CurrentPage }>()
);

export const selectSignupPage = createAction(
  '[Auth Page] Signup page',
  props<{ currentAuthPage: CurrentPage }>()
);

export const selectForgotPage = createAction(
  '[Auth Page] Forgot page',
  props<{ currentAuthPage: CurrentPage }>()
);
