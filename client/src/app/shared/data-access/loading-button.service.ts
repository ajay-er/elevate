import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingButtonService {
  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  startLoading() {
    this.loading.next(true);
  }

  stopLoading() {
    this.loading.next(false);
  }
}
