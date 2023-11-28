import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IRole } from '../types';

@Injectable({
  providedIn: 'root'
})
export class PagelayoutService {
  private layoutSubject = new BehaviorSubject<IRole>(IRole.FOUNDER);

  public layout$ = this.layoutSubject.asObservable();

  setLayout(value: IRole) {
    this.layoutSubject.next(value);
  }
}
