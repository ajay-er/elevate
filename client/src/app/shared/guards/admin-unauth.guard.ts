import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../data-access/local-storage.service';
import { JwtService } from '../data-access/jwt.service';

export const adminUnauthGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const localStoreService = inject(LocalStorageService);
  const token = localStoreService.get('access_token');

  if (!token) {
    return true;
  }

  if (!jwtService.isAdmin(token)) {
    return true;
  }

  return false;
};
