import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './chat-list.component';

@NgModule({
  declarations: [ChatListComponent],
  imports: [CommonModule],
  exports: [ChatListComponent],
})
export class ChatListModule {}
