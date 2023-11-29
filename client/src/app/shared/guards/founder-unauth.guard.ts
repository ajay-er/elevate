import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../data-access/jwt.service';
import { LocalStorageService } from '../data-access/local-storage.service';

export const founderUnauthGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);
  const localStoreService = inject(LocalStorageService);
  const token = localStoreService.get('access_token');

  if (!token) {
    return true;
  }

  if (!jwtService.isFounder(token)) {
    return true;
  }
  router.navigateByUrl('/founder/ideas');
  return false;
};
