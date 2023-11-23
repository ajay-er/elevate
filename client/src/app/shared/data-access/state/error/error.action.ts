import { createAction, props } from "@ngrx/store";

export const SetError = createAction(
  "[Auth] Set Error",
  props<{ errorMessage: string; errorType: string }>()
);

export const ClearError = createAction("[Auth] Clear Error");
