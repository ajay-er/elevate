import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LocalStorageService } from '../../local-storage.service';
import * as AuthActions from './auth.action';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  storeCurrentUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.SetCurrentUser),
        tap((action) => {
          this.localstorageService.saveKeys(action.currentUser);
          this.router.navigate(['/ideas']);
        })
      );
    },
    { dispatch: false }
  );

  storeToken$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.SetAccessToken),
        tap((action) => {
          this.localstorageService.save(action.tokenType,action.accessToken);
        })
      );
    },
    { dispatch: false }
  );

  clearLocalStorageOnLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.UnsetCurrentUser),
      switchMap(() =>
        this.authService.logout().pipe(
          switchMap((r) => {
            return [
              AuthActions.ClearLocalStorageAction(),
              AuthActions.LogoutSuccess(),
            ];
          }),
          catchError((error) => {
            console.error('Logout API Error:', error);
            return [
              AuthActions.ClearLocalStorageAction(),
              AuthActions.LogoutFailer(),
            ];
          })
        )
      )
    )
  );

  clearLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.ClearLocalStorageAction),
        tap((r) => {
          this.localstorageService.clear();
        })
      ),
    { dispatch: false }
  );

  getLocalStorageData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.CheckLocalStorageAction),
      map(() => {
        const keys = ['name', 'photo', 'email', 'isEmailVerified'];
        const currentUserData: any = {};
        for (const key of keys) {
          const value = this.localstorageService.get(key);
          if (value !== null) {
            currentUserData[key] =
              key === 'isEmailVerified'
                ? isJSONString(value)
                  ? JSON.parse(value)
                  : false
                : value;
            function isJSONString(str: string) {
              try {
                JSON.parse(str);
                return true;
              } catch (e) {
                return false;
              }
            }
          }
        }
        console.log(currentUserData);

        const isUserPresent =
          Object.keys(currentUserData).length > 0 &&
          currentUserData.isEmailVerified;

        if (isUserPresent) {
          this.store.dispatch(AuthActions.SetUserLoggedInTrue());
        }

        return AuthActions.GetLocalStorageData({
          currentUser: currentUserData,
        });
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
