import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, inject } from '@angular/core';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  private snackbar = inject(SnackbarService);

  handleError(error: Error | HttpErrorResponse): void {
    let errorMsg = '';

    if (error instanceof HttpErrorResponse) {
      console.log('Error from the server', error);

      if (error.error.errors[0].message) {
        errorMsg = error.error.errors[0].message;
      } else {
        errorMsg = error.message;
      }
    } else {
      console.log('Error from the client', error);
      errorMsg = error.message;
    }

    this.snackbar.showError(errorMsg);
  }
}
