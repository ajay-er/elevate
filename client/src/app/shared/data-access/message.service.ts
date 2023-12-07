import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { IMessage } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  private socket:Socket;

  constructor() {
    this.socket = io('http://elevate.test', {
      transports:['websocket'],
      path:'/api/v1/chat/socket.io',
      withCredentials:true,
    });

    this.socket.on('message', (message: any) => {
      console.log(message,'yes');
    });
  }

  joinRoom(sender: string, recipient: string): void {
    this.socket.emit('join', { sender, recipient });
  }

  // Send a message
  sendMessage(data: IMessage): void {
    this.socket.emit('message', data);
  }

  // Handle disconnect
  handleDisconnect(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('disconnect', () => {
        observer.next();
      });
    });
  }
}
