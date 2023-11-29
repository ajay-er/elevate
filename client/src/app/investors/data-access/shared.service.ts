import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private dataSubject = new Subject<File>();

  sendImageFile(data: File) {
    this.dataSubject.next(data);
  }

  getData() {
    return this.dataSubject.asObservable();
  }
}
