import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LocalStorageService } from '../../local-storage.service';
import * as AuthActions from './auth.action';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { JwtService } from '../../jwt.service';
import { IJwtPayload } from 'src/app/shared/interfaces';
import { PagelayoutService } from '../../pagelayout.service';

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
        const currentUserData:any = {};
        const token = this.localstorageService.get('access_token');
        if (token) {
          const payLoad:IJwtPayload | null = this.jwtService.getDecodedToken(token);
          currentUserData.name = payLoad?.name;
          currentUserData.email = payLoad?.email;
          currentUserData.photo = payLoad?.profileImgUrl;
          currentUserData.isEmailVerified = payLoad?.isEmailVerified;
        }

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
    private router: Router,
    private jwtService :JwtService,
    private pageLayout :PagelayoutService,
  ) {}
}
