import { Component, inject } from '@angular/core';
import { ChatService } from 'src/app/shared/data-access/message.service';
import { InvestorsService } from '../../data-access/investors.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  private chatService = inject(ChatService);
  private investorService = inject(InvestorsService);
  protected users = [];
  private currentUserId = '';

  ngOnInit() {   
    this.chatService.connect(); 
    this.investorService.getAllChatList().subscribe((res:any) => {
      this.users = res.chat;  
      console.log(this.users);
        
      this.currentUserId = res.currentUserId;  
      this.chatService.setCurrentUser(this.currentUserId);
      this.chatService.addUser();
    });
  }

  ngOnDestroy() {
    this.chatService.disconnect();
  }
}
