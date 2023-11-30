import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { ChatListModule } from '../../ui/chat-list/chat-list.module';
import { ChatDetailsModule } from '../../ui/chat-details/chat-details.module';

@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    ChatListModule,
    ChatDetailsModule,
  ],
})
export class MessagesModule {}
