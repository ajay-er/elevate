import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../data-access/jwt.service';
import { LocalStorageService } from '../data-access/local-storage.service';

export const investorAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtService = inject(JwtService);
  const localStoreService = inject(LocalStorageService);
  const token = localStoreService.get('access_token');

  if (!token) {
    router.navigateByUrl('/auth/investor/login');
    return false;
  }

  if (jwtService.isInvestor(token)) {
    if (jwtService.isTokenExpired(token)) {
      localStoreService.clear();
      return false;
    }
    return true;
  }
  router.navigateByUrl('/auth/investor/login');
  return false;
};
