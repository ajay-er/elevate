import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket:Socket;

  private participantId = new BehaviorSubject<string>('');
  private currentUserId = new BehaviorSubject<string>('');
  private chatHistory = new BehaviorSubject<any>([]);

  constructor() {
    this.socket = io('https://ajay404.online', {
      transports:['websocket'],
      path:'/api/v1/chat/socket.io',
      withCredentials:true,
      autoConnect:false
    });

    this.socket.on('getUsers',(data) => {
      console.log('active sockets:',data);
    });
    this.socket.on('receiveMessage',(message) => {
      console.log(message,'this is message');
      if (message.users.includes(this.participantId.getValue())) {
        const history = this.chatHistory.getValue();   
        this.setChatHistory({participant:history.participant,messages:[...history.messages, message]});
      }
    });
  }

  connect() {
    this.socket.connect();
  }

  addUser() {
    this.socket.emit('addUser',this.currentUserId.getValue());
  }

  disconnect() {
    this.socket.disconnect();
  }

  setCurrentParticipent(participantId: string) {
    this.participantId.next(participantId);
  }

  getChatHistory():Observable<any> {
    return this.chatHistory.asObservable();
  }

  setChatHistory(data:any) {    
    this.chatHistory.next(data);
  }

  setCurrentUser(user: string) {
    this.currentUserId.next(user);
  }

  sendMessage(msg: string) {
    const participantId = this.participantId.getValue();
    const senderId = this.currentUserId.getValue();
    const data = {
      recipient: participantId,
      sender: senderId,
      text: msg,
    };    
    this.socket.emit('message', data);
  }
}
