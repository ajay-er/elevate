import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { State, isUserLoggedIn } from "../data-access/state/auth";
import { map, take } from "rxjs";

export const unauthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store<State>);
  return store.select(isUserLoggedIn).pipe(
    take(1),
    map((isUserLoggedIn) => {
      if (isUserLoggedIn) {
        router.navigateByUrl("/ideas");
        return false;
      } else {
        return true;
      }
    })
  );
};
