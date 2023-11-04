import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../data-access/local-storage.service';
import { JwtService } from '../data-access/jwt.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtService = inject(JwtService);
  const localStoreService = inject(LocalStorageService);
  const token = localStoreService.get('access_token');

  if (!token) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  if (jwtService.isTokenExpired(token) && jwtService.isUser(token)) {
    return true;
  }

  router.navigateByUrl('/auth/login');
  return false;
};
