import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  private apiUrl = environment.apiUrl;
  private localstorageService = inject(LocalStorageService);
  private token = '';
  constructor() {
    this.localstorageService.get('access_token');
  }
  
  socket = io(`${this.apiUrl}/founder/chat`, {
    withCredentials: true,
    extraHeaders: {
      'Authorization': `Bearer ${this.token}`
    }
  });

  public sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (msg: any) => {
      this.message$.next(msg);
    });
    return this.message$.asObservable();
  };
}
