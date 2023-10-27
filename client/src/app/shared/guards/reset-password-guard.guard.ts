import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/auth/data-access/auth.service';

export const resetPasswordGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const token = route.params['token'];

  authService.checkTokenValidation(token).subscribe({
    next: (res) => {
      console.log("Token verified");
      return true;
    },
    error: (err) => {
      console.error(err);
      return false;
    },
  });

  return false;
};
