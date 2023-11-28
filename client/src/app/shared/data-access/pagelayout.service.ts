import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageLayout } from '../types';

@Injectable({
  providedIn: 'root'
})
export class PagelayoutService {
  private layoutSubject = new BehaviorSubject<PageLayout>(PageLayout.Founder);

  public layout$ = this.layoutSubject.asObservable();

  setLayout(value: PageLayout) {
    this.layoutSubject.next(value);
  }
}
