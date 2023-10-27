import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { isUserLoggedIn } from 'src/app/auth/data-access/state';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);
  return store.select(isUserLoggedIn).pipe(
    take(1),
    map(isUserLoggedIn => {      
      if (isUserLoggedIn) {
        return true;
      } else {
        return router.parseUrl('/ideas'); 
      }
    })
  );
};
