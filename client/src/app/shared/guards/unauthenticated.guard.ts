import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { isUserLoggedIn } from 'src/app/auth/data-access/state';

export const unauthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(isUserLoggedIn).pipe(
    take(1),
    map(isUserLoggedIn => {      
      if (isUserLoggedIn) {
        router.navigateByUrl('/ideas'); 
        return true;
      } else {
        return false;
      }
    })
  );
};
