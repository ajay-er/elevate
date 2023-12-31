import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../data-access/auth.service';

export const resetPasswordGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = route.params['token'];

  // Create a Promise to wait for the API call result
  const checkTokenValidation = (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      authService.checkTokenValidation(token).subscribe({
        next: (res) => {
          resolve(true); // Token is valid
        },
        error: (err) => {
          resolve(false); // Token is not valid
        },
      });
    });
  };

  try {
    const isValid = await checkTokenValidation();
    if (isValid) {
      return true;
    } else {
      router.navigateByUrl('/ideas');
      return false;
    }
  } catch (error) {
    return false; // Handle any errors appropriately
  }
};
