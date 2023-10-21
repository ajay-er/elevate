import { createAction, props } from '@ngrx/store';
import { Tab } from 'src/app/shared/types';

export const toogleAuthTab = createAction(
  '[Auth Page] Toggle Current Tab',
  props<{ currentAuthTab: Tab }>()
);
