import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../data-access/local-storage.service';

export const verifyOTPGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStoreService = inject(LocalStorageService);
  const verificationTimestamp = localStoreService.getOtpVerifyTimeLimitToken();
  console.log(verificationTimestamp,'time stamp');
  if (verificationTimestamp) {
    const currentTime = new Date().getTime();
    const difference = currentTime - parseInt(verificationTimestamp, 10);

    const accessAllowed = difference <= 5 * 60 * 1000;
    if (accessAllowed) {
      return true;
    }
  }
  //TODO:need to change this router to after add error page --> router.navigate(['/error']);
  router.navigate(['/auth/signup']);
  return false;
};
