import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage.service';
import { GetLocalStorageData, SetCurrentUser, UnsetCurrentUser } from './auth.action';

@Injectable()
export class AuthEffects {
  storeToken$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SetCurrentUser),
        tap((action) => {
          this.localstorageService.saveKeys(action.currentUser);
        })
      );
    },
    { dispatch: false }
  );

  clearLocalStorageOnLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UnsetCurrentUser),
        tap(() => {
          this.localstorageService.clear();
        })
      ),
    { dispatch: false }
  );

  getLocalStorageData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetLocalStorageData),
      map(() => {
        const keys = ['name', 'photo', 'email'];
        const currentUserData: any = {};
        for (const key of keys) {
          const value = this.localstorageService.get(key);
          if (value !== null) {
            currentUserData[key] = value;
          }
        }
        return SetCurrentUser({ currentUser: currentUserData });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private localstorageService: LocalStorageService
  ) {}
}
