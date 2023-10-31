import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingButtonService } from '../data-access/loading-button.service';

@Injectable()
export class LoadingButtonInterceptor implements HttpInterceptor {
  private loadingButtonService = inject(LoadingButtonService);
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingButtonService.startLoading();
    return next.handle(request).pipe(
      finalize(() => {
        if (request instanceof HttpRequest) {
          this.loadingButtonService.stopLoading();
        }
      })
    );
  }
}
