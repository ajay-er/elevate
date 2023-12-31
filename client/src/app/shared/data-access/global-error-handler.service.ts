import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone, inject } from '@angular/core';
import { SnackbarService } from './snackbar.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  private snackbar = inject(SnackbarService);
  private router = inject(Router);
  private zone = inject(NgZone);

  handleError(error: Error | HttpErrorResponse): void {
    let errorMsg = '';

    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        window.localStorage.clear();
        this.router.navigateByUrl('/auth/founder/login');
      }
      console.log('Error from the server', error);
      errorMsg =
        error.error?.errors?.[0]?.message || 'oops something went wrong';
    } else {
      console.log('Error from the client', error);
      errorMsg = error.message;
    }
    this.zone.run(() => this.snackbar.showError(errorMsg));
  }
}
