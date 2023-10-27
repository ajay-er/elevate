import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

let hasClickedVerifyOTP: boolean = false;
export const verifyOTPGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (hasClickedVerifyOTP) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};

export function resetClickedVerifyOTP() {
  hasClickedVerifyOTP = false;
  setTimeout(() => {
    hasClickedVerifyOTP = true;
  }, 30000);
}

export function setClickedVerifyOTP() {
  hasClickedVerifyOTP = true;
}
