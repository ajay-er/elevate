import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../data-access/auth.service';

export const resetPasswordGuardGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = route.params['token'];

  // Create a Promise to wait for the API call result
  const checkTokenValidation = (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      authService.checkTokenValidation(token).subscribe({
        next: (res) => {
          console.log(res);
          resolve(true); // Token is valid
        },
        error: (err) => {
          console.log(err);
          resolve(false); // Token is not valid
        },
      });
    });
  };

  try {
    let isValid = await checkTokenValidation();
    if (isValid) {
      return true;
    } else {
      router.navigateByUrl('ideas');
      return false;
    }
  } catch (error) {
    console.error(error);
    return false; // Handle any errors appropriately
  }
};
