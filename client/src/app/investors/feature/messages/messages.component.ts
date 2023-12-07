import { Component, inject } from '@angular/core';
import { ChatService } from 'src/app/shared/data-access/message.service';
import { InvestorsService } from '../../data-access/investors.service';
import { ChatDetailsService } from '../../data-access/shared.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  private chatService = inject(ChatService);
  private chatDetailsService = inject(ChatDetailsService);
  private investorService = inject(InvestorsService);
  protected users = [];
  private currentUserId = '';

  ngOnInit() {
    this.investorService.getAllChatList().subscribe((res:any) => {
      console.log(res);
      this.users = res.chat;
      this.currentUserId = res.currentUserId;
      this.chatDetailsService.setCurrentUser(this.currentUserId);
    });

    this.chatService.handleDisconnect().subscribe(() => {
      console.log('Disconnected from the server');
    });
  }
}
