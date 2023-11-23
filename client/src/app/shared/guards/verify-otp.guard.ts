import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LocalStorageService } from "../data-access/local-storage.service";

export const verifyOTPGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStoreService = inject(LocalStorageService);
  const verificationTimestamp = localStoreService.getOtpVerifyTimeLimitToken();
  if (verificationTimestamp) {
    const currentTime = new Date().getTime();
    const difference = currentTime - parseInt(verificationTimestamp, 10);

    const accessAllowed = difference <= 5 * 60 * 1000;
    if (accessAllowed) {
      return true;
    }
  }
  router.navigate(["/not-found"]);
  return false;
};
