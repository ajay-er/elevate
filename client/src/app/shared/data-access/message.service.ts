import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  private apiUrl = environment.apiUrl;
  socket = io(`${this.apiUrl}/founder/chat`);

  public sendMessage(message: any) {    
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message',(msg:any) => {
      this.message$.next(msg);
    });
    return this.message$.asObservable();
  };
}