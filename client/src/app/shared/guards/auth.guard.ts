import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs';
import { State, isUserLoggedIn } from '../data-access/state/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store<State>);
  return store.select(isUserLoggedIn).pipe(
    take(1),
    map((isUserLoggedIn) => {
      if (!isUserLoggedIn) {
        router.navigateByUrl('/ideas');
        return false;
      } else {
        return true;
      }
    })
  );
};
