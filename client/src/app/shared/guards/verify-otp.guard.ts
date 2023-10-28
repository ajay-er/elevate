import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

let hasClickedVerifyOTP: boolean = false;
export const verifyOTPGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (hasClickedVerifyOTP) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};

export function setClickedVerifyOTP() {
  hasClickedVerifyOTP = true;
  setTimeout(() => {
    hasClickedVerifyOTP = false;
  }, 30000);
}
