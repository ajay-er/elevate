import { Component, inject } from '@angular/core';
import { ChatService } from 'src/app/shared/data-access/message.service';
import { IMessage } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  protected messageList: string[] = [];
  private chatService = inject(ChatService);

  ngOnInit() {
    // this.chatService.joinRoom('user1','user2');

    this.chatService.receiveMessages().subscribe((message: string) => {
      console.log(message);
      this.messageList.push(message);
    });

    this.chatService.handleDisconnect().subscribe(() => {
      console.log('Disconnected from the server');
    });
  }

  sendMessage(msg:IMessage) {
    this.chatService.sendMessage(msg);
  }
}
