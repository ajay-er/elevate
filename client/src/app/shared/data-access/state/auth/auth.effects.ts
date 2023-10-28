import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LocalStorageService } from '../../local-storage.service';
import {
  CheckLocalStorageAction,
  ClearLocalStorageAction,
  GetLocalStorageData,
  LogoutFailer,
  LogoutSuccess,
  SetCurrentUser,
  SetUserLoggedInTrue,
  UnsetCurrentUser,
} from './auth.action';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  storeCurrentUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SetCurrentUser),
        tap((action) => {
          this.localstorageService.saveKeys(action.currentUser);
          this.router.navigate(['/ideas']);
        })
      );
    },
    { dispatch: false }
  );

  clearLocalStorageOnLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnsetCurrentUser),
      switchMap(() =>
        this.authService.logout().pipe(
          switchMap((r) => {
            return [ClearLocalStorageAction(), LogoutSuccess()];
          }),
          catchError((error) => {
            console.error('Logout API Error:', error);
            return [ClearLocalStorageAction(), LogoutFailer()];
          })
        )
      )
    )
  );

  clearLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ClearLocalStorageAction),
        tap((r) => {
          console.log('here reched');

          this.localstorageService.clear();
        })
      ),
    { dispatch: false }
  );

  getLocalStorageData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckLocalStorageAction),
      map(() => {
        const keys = ['name', 'photo', 'email'];
        const currentUserData: any = {};
        for (const key of keys) {
          const value = this.localstorageService.get(key);
          if (value !== null) {
            currentUserData[key] = value;
          }
        }
        const isUserPresent = Object.keys(currentUserData).length > 0;

        if (isUserPresent) {
          this.store.dispatch(SetUserLoggedInTrue());
        }

        return GetLocalStorageData({ currentUser: currentUserData });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private localstorageService: LocalStorageService,
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {}
}
