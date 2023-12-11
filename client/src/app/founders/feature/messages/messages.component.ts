import { Component, inject } from '@angular/core';
import { ChatService } from 'src/app/shared/data-access/message.service';
import { FoundersService } from '../../data-access/founders.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  private chatService = inject(ChatService);
  private founderService = inject(FoundersService);
  protected users = [];
  private currentUserId = '';

  ngOnInit() {   
    this.chatService.connect(); 
    this.founderService.getAllChatList().subscribe((res:any) => {
      this.users = res.chat;  
      console.log(res);
      
      this.currentUserId = res.currentUserId;  
      this.chatService.setCurrentUser(this.currentUserId);
      this.chatService.addUser();
    });
  }

  ngOnDestroy() {
    this.chatService.disconnect();
  }
}
