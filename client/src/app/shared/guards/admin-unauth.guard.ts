import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../data-access/local-storage.service';
import { JwtService } from '../data-access/jwt.service';

export const adminUnauthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtService = inject(JwtService);
  const localStoreService = inject(LocalStorageService);
  const token = localStoreService.get('access_token');

  if (!token) {
    router.navigateByUrl('/ideas');
    return false;
  }

  if (jwtService.isAdmin(token)) {
    router.navigateByUrl('/not-found');
    return false;
  }

  router.navigateByUrl('/admin/dashboard');
  return true;
};
