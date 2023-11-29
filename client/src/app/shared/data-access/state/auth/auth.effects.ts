import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LocalStorageService } from '../../local-storage.service';
import * as AuthActions from './auth.action';
import { AuthService } from '../../auth.service';
import { JwtService } from '../../jwt.service';
import { IJwtPayload } from 'src/app/shared/interfaces';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  storeToken$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.SetAccessToken),
        tap((action) => {
          this.localstorageService.save(action.tokenType, action.accessToken);
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
        const currentUserData: any = {};
        const token = this.localstorageService.get('access_token');
        if (token) {
          const payLoad: IJwtPayload | null =
            this.jwtService.getDecodedToken(token);
          currentUserData.name = payLoad?.name;
          currentUserData.email = payLoad?.email;
          currentUserData.photo = payLoad?.profileImgUrl;
          currentUserData.isEmailVerified = payLoad?.isEmailVerified;
          currentUserData.role = payLoad?.role;
        }

        const isFounder = token ? this.jwtService.isFounder(token) : false;
        const isInvestor = token ? this.jwtService.isInvestor(token) : false;

        // isInvestor ? this.router.navigateByUrl('/investor/ideas') : this.router.navigateByUrl('/founder/ideas');

        return AuthActions.SetCurrentUser({
          currentUser: currentUserData,
          isFounderLoggedIn: isFounder,
          isInvestorLoggedIn: isInvestor,
        });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private localstorageService: LocalStorageService,
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router
  ) {}
}
