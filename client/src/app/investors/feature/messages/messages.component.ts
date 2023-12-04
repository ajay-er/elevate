import { Component, inject } from '@angular/core';
import { ChatService } from 'src/app/shared/data-access/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messageList: string[] = [];
  private chatService = inject(ChatService);

  ngOnInit() {
    this.chatService.getNewMessage().subscribe((message: string) => {
      console.log(message);
      this.messageList.push(message);
    });
  }

  sendMessage(msg:any) {
    console.log(msg);
    this.chatService.sendMessage(msg);
  }
}
