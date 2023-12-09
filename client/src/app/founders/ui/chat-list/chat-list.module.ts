import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './chat-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ChatListComponent],
  imports: [CommonModule,RouterModule],
  exports: [ChatListComponent],
})
export class ChatListModule {}
