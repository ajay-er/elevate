import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../data-access/local-storage.service';

export const unauthenticatedGuard: CanActivateFn = (route, state) => {
  const localstorageService = inject(LocalStorageService);
  const router = inject(Router);
  const isTokenAvailable = localstorageService.isTokenAvailable();
  if (isTokenAvailable) {
    return false;
  } else {
    router.navigateByUrl('/ideas');
    return true;
  }
};
